import { supabase } from "@/integrations/supabase/client";
import type {
  Dokument,
  DokumentTyp,
  DokumentStatus,
  Dokumentposition,
  DokumentSummen,
  MwstGruppe,
  Zahlung,
  DokumentEmpfaenger,
  DokumentAbsender,
} from "@/types/dokumente";

// ── Typ-Präfix-Map ───────────────────────────────────────────────────────────

const TYP_COLUMN: Record<DokumentTyp, string> = {
  angebot: "Angebot",
  auftragsbestaetigung: "Auftragsbestätigung",
  rechnung: "Rechnung",
  abschlagsrechnung: "Abschlagsrechnung",
  mahnung: "Mahnung",
  gutschrift: "Gutschrift",
  stornorechnung: "Stornorechnung",
};

const COLUMN_TYP: Record<string, DokumentTyp> = {
  Angebot: "angebot",
  Auftragsbestätigung: "auftragsbestaetigung",
  Rechnung: "rechnung",
  Abschlagsrechnung: "abschlagsrechnung",
  Mahnung: "mahnung",
  Gutschrift: "gutschrift",
  Stornorechnung: "stornorechnung",
};

// ── Row mapper ───────────────────────────────────────────────────────────────

function toDokument(row: Record<string, unknown>, positionen: Dokumentposition[], zahlungen: Zahlung[]): Dokument {
  const bezahlt = zahlungen.reduce((s, z) => s + z.betrag, 0);
  const brutto = (row.total as number) || (row.brutto as number) || 0;
  return {
    id: row.id as string,
    nummer: (row.document_number as string) || "",
    typ: COLUMN_TYP[(row.type as string)] || "angebot",
    status: (row.status as DokumentStatus) || "entwurf",

    quelldokumentId: (row.quelldokument_id as string) || undefined,
    quelldokumentNummer: (row.quelldokument_nummer as string) || undefined,
    folgedokumentId: (row.folgedokument_id as string) || undefined,
    folgedokumentTyp: (row.folgedokument_typ as DokumentTyp) || undefined,

    customerId: (row.customer_id as string) || undefined,
    eventId: (row.event_id as string) || undefined,
    requestId: (row.request_id as string) || undefined,
    showId: (row.show_id as string) || undefined,
    produktionId: (row.produktion_id as string) || undefined,

    empfaenger: ((row.empfaenger as DokumentEmpfaenger) || {
      name: (row.name as string) || "",
      adresse: "", plz: "", ort: "", land: "Deutschland",
    }),
    absender: ((row.absender as DokumentAbsender) || {
      name: "Emilian Leber", adresse: "", plz: "", ort: "", land: "Deutschland",
      email: "el@magicel.de", kleinunternehmer: false,
    }),

    datum: (row.document_date as string) || (row.created_at as string),
    gueltigBis: (row.gueltig_bis as string) || undefined,
    lieferdatum: (row.lieferdatum as string) || undefined,
    faelligAm: (row.faellig_am as string) || (row.due_date as string) || undefined,
    zahlungszielTage: (row.zahlungsziel_tage as number) || 14,

    positionen,
    kopftext: (row.kopftext as string) || (row.intro_text as string) || "",
    fusstext: (row.fusstext as string) || (row.closing_text as string) || "",
    infoText: (row.info_text as string) || undefined,

    netto: (row.subtotal as number) || 0,
    mwstGruppen: ((row.mwst_gruppen as MwstGruppe[]) || []),
    mwstBetrag: (row.mwst_betrag as number) || (row.tax_amount as number) || 0,
    brutto,
    rabattProzent: (row.rabatt_prozent as number) || undefined,
    rabattBetrag: (row.rabatt_betrag as number) || undefined,

    zahlungen,
    bezahltBetrag: bezahlt,
    offenerBetrag: Math.max(0, brutto - bezahlt),

    notizen: (row.notizen as string) || undefined,
    createdAt: row.created_at as string,
    updatedAt: (row.updated_at as string) || (row.created_at as string),
    previewHtml: (row.preview_html as string) || undefined,
  };
}

function toPosition(row: Record<string, unknown>): Dokumentposition {
  return {
    id: row.id as string,
    position: (row.position as number) || 1,
    typ: (row.zeilen_typ as Dokumentposition["typ"]) || "leistung",
    bezeichnung: (row.description as string) || "",
    beschreibung: (row.beschreibung as string) || undefined,
    menge: (row.quantity as number) || 1,
    einheit: (row.unit as string) || "pauschal",
    einzelpreis: (row.unit_price as number) || 0,
    gesamt: (row.total as number) || 0,
    mwstSatz: (row.mwst_satz as number) || 0,
    rabattProzent: (row.rabatt_prozent as number) || undefined,
    artikelId: (row.artikel_id as string) || undefined,
  };
}

function toZahlung(row: Record<string, unknown>): Zahlung {
  return {
    id: row.id as string,
    datum: row.datum as string,
    betrag: row.betrag as number,
    zahlungsart: (row.zahlungsart as Zahlung["zahlungsart"]) || "ueberweisung",
    notiz: (row.notiz as string) || undefined,
  };
}

// ── Berechnungslogik ─────────────────────────────────────────────────────────

export function berechneSummen(positionen: Dokumentposition[], rabattProzent?: number): DokumentSummen {
  const mwstMap: Record<number, { netto: number; steuer: number }> = {};

  let netto = 0;
  for (const pos of positionen) {
    if (pos.typ === "text" || pos.typ === "zwischensumme" || pos.typ === "seitenumbruch") continue;
    const posNetto = pos.menge * pos.einzelpreis * (1 - (pos.rabattProzent ?? 0) / 100);
    netto += posNetto;
    const satz = pos.mwstSatz;
    if (!mwstMap[satz]) mwstMap[satz] = { netto: 0, steuer: 0 };
    mwstMap[satz].netto += posNetto;
    mwstMap[satz].steuer += posNetto * (satz / 100);
  }

  const rabattBetrag = rabattProzent ? netto * (rabattProzent / 100) : 0;
  const nettoNachRabatt = netto - rabattBetrag;
  const mwstGruppen: MwstGruppe[] = Object.entries(mwstMap).map(([satz, v]) => ({
    satz: Number(satz),
    netto: v.netto,
    steuer: v.steuer,
  }));
  const mwstBetrag = mwstGruppen.reduce((s, g) => s + g.steuer, 0);
  const brutto = nettoNachRabatt + mwstBetrag;

  return {
    netto: nettoNachRabatt,
    mwstGruppen,
    mwstBetrag,
    brutto,
    rabattBetrag,
    offenerBetrag: brutto,
  };
}

// ── Nummernvergabe ───────────────────────────────────────────────────────────

const NK_COLUMN: Record<DokumentTyp, [string, string]> = {
  angebot: ["nk_angebot_prefix", "nk_angebot_naechste"],
  rechnung: ["nk_rechnung_prefix", "nk_rechnung_naechste"],
  abschlagsrechnung: ["nk_rechnung_prefix", "nk_rechnung_naechste"],
  auftragsbestaetigung: ["nk_ab_prefix", "nk_ab_naechste"],
  mahnung: ["nk_mahnung_prefix", "nk_mahnung_naechste"],
  gutschrift: ["nk_rechnung_prefix", "nk_rechnung_naechste"],
  stornorechnung: ["nk_rechnung_prefix", "nk_rechnung_naechste"],
};

async function naechsteNummer(typ: DokumentTyp): Promise<string> {
  const { data } = await supabase.from("admin_settings").select("*").limit(1).maybeSingle();
  const year = new Date().getFullYear();
  const [prefixCol, numCol] = NK_COLUMN[typ];
  const prefix = (data?.[prefixCol] as string) || "AN";
  const num = (data?.[numCol] as number) || 1;
  const formatted = `${prefix}-${year}-${String(num).padStart(3, "0")}`;

  // Increment
  if (data?.id) {
    await supabase.from("admin_settings").update({ [numCol]: num + 1 }).eq("id", data.id);
  }
  return formatted;
}

// ── Public: fetch & reserve next number without creating the document yet ──
export async function reserviereNummer(typ: DokumentTyp): Promise<string> {
  return naechsteNummer(typ);
}

// ── Haupt-Service ────────────────────────────────────────────────────────────

export const dokumenteService = {

  // ── List ──────────────────────────────────────────────────────────────────

  async getAll(filter?: { typ?: DokumentTyp; status?: DokumentStatus }): Promise<Dokument[]> {
    let query = supabase
      .from("portal_documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter?.typ) {
      query = query.eq("type", TYP_COLUMN[filter.typ]);
    } else {
      // Only return workflow documents, not uploaded files
      query = query.in("type", Object.values(TYP_COLUMN));
    }

    if (filter?.status) {
      query = query.eq("status", filter.status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data || []).map((row) => toDokument(row, [], []));
  },

  // ── Single with positions + payments ──────────────────────────────────────

  async getById(id: string): Promise<Dokument | null> {
    const [docRes, posRes, zahlRes] = await Promise.all([
      supabase.from("portal_documents").select("*").eq("id", id).maybeSingle(),
      supabase.from("document_positions").select("*").eq("document_id", id).order("position"),
      supabase.from("dokument_zahlungen").select("*").eq("dokument_id", id).order("datum"),
    ]);
    if (docRes.error) throw docRes.error;
    if (!docRes.data) return null;

    const positionen = (posRes.data || []).map(toPosition);
    const zahlungen = (zahlRes.data || []).map(toZahlung);
    return toDokument(docRes.data, positionen, zahlungen);
  },

  // ── Create ────────────────────────────────────────────────────────────────

  async create(
    typ: DokumentTyp,
    data: Partial<Omit<Dokument, "id" | "nummer" | "typ" | "createdAt" | "updatedAt">>,
    positionen: Omit<Dokumentposition, "id">[],
    vorgeneriertNummer?: string,
  ): Promise<Dokument> {
    const nummer = vorgeneriertNummer || await naechsteNummer(typ);
    const summen = berechneSummen(
      positionen.map((p, i) => ({ ...p, id: `tmp-${i}` })),
      data.rabattProzent,
    );

    const { data: inserted, error } = await supabase
      .from("portal_documents")
      .insert({
        type: TYP_COLUMN[typ],
        document_number: nummer,
        document_date: data.datum || new Date().toISOString().split("T")[0],
        status: data.status || "entwurf",
        customer_id: data.customerId || null,
        event_id: data.eventId || null,
        request_id: data.requestId || null,
        show_id: data.showId || null,
        produktion_id: data.produktionId || null,
        quelldokument_id: data.quelldokumentId || null,
        quelldokument_nummer: data.quelldokumentNummer || null,
        empfaenger: data.empfaenger || {},
        absender: data.absender || {},
        gueltig_bis: data.gueltigBis || null,
        lieferdatum: data.lieferdatum || null,
        faellig_am: data.faelligAm || null,
        due_date: data.faelligAm || null,
        zahlungsziel_tage: data.zahlungszielTage || 14,
        kopftext: data.kopftext || "",
        intro_text: data.kopftext || "",
        fusstext: data.fusstext || "",
        closing_text: data.fusstext || "",
        info_text: data.infoText || "",
        mwst_gruppen: summen.mwstGruppen,
        mwst_betrag: summen.mwstBetrag,
        tax_amount: summen.mwstBetrag,
        subtotal: summen.netto,
        total: summen.brutto,
        amount: summen.brutto,
        rabatt_prozent: data.rabattProzent || null,
        rabatt_betrag: summen.rabattBetrag || null,
        bezahlt_betrag: 0,
        offener_betrag: summen.brutto,
        notizen: data.notizen || "",
        name: `${TYP_COLUMN[typ]} ${nummer}`,
        preview_html: data.previewHtml || "",
      })
      .select("*")
      .single();
    if (error) throw error;

    // Insert positions
    if (positionen.length > 0) {
      const posRows = positionen.map((p, i) => ({
        document_id: inserted.id,
        position: i + 1,
        zeilen_typ: p.typ,
        description: p.bezeichnung,
        beschreibung: p.beschreibung || "",
        quantity: p.menge,
        unit: p.einheit,
        unit_price: p.einzelpreis,
        total: p.gesamt,
        mwst_satz: p.mwstSatz,
        rabatt_prozent: p.rabattProzent || null,
        artikel_id: p.artikelId || null,
      }));
      const { error: posErr } = await supabase.from("document_positions").insert(posRows);
      if (posErr) throw posErr;
    }

    const created = await this.getById(inserted.id);
    if (!created) throw new Error("Dokument nach Erstellung nicht gefunden (id=" + inserted.id + ")");
    return created;
  },

  // ── Update ────────────────────────────────────────────────────────────────

  async update(
    id: string,
    data: Partial<Omit<Dokument, "id" | "nummer" | "typ" | "createdAt">>,
    positionen?: Omit<Dokumentposition, "id">[],
  ): Promise<Dokument> {
    const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };

    if (data.status !== undefined) patch.status = data.status;
    if (data.empfaenger !== undefined) patch.empfaenger = data.empfaenger;
    if (data.absender !== undefined) patch.absender = data.absender;
    if (data.datum !== undefined) patch.document_date = data.datum;
    if (data.gueltigBis !== undefined) patch.gueltig_bis = data.gueltigBis;
    if (data.lieferdatum !== undefined) patch.lieferdatum = data.lieferdatum;
    if (data.faelligAm !== undefined) { patch.faellig_am = data.faelligAm; patch.due_date = data.faelligAm; }
    if (data.zahlungszielTage !== undefined) patch.zahlungsziel_tage = data.zahlungszielTage;
    if (data.kopftext !== undefined) { patch.kopftext = data.kopftext; patch.intro_text = data.kopftext; }
    if (data.fusstext !== undefined) { patch.fusstext = data.fusstext; patch.closing_text = data.fusstext; }
    if (data.infoText !== undefined) patch.info_text = data.infoText;
    if (data.previewHtml !== undefined) patch.preview_html = data.previewHtml;
    if (data.rabattProzent !== undefined) patch.rabatt_prozent = data.rabattProzent;
    if (data.notizen !== undefined) patch.notizen = data.notizen;
    if (data.quelldokumentId !== undefined) { patch.quelldokument_id = data.quelldokumentId; patch.quelldokument_nummer = data.quelldokumentNummer || null; }
    if (data.folgedokumentId !== undefined) { patch.folgedokument_id = data.folgedokumentId; patch.folgedokument_typ = data.folgedokumentTyp || null; }
    if (data.customerId !== undefined) patch.customer_id = data.customerId;
    if (data.eventId !== undefined) patch.event_id = data.eventId;
    if (data.requestId !== undefined) patch.request_id = data.requestId;
    if (data.showId !== undefined) patch.show_id = data.showId;
    if (data.produktionId !== undefined) patch.produktion_id = data.produktionId;

    // Recalculate totals if positions given
    if (positionen !== undefined) {
      const summen = berechneSummen(
        positionen.map((p, i) => ({ ...p, id: `tmp-${i}` })),
        data.rabattProzent,
      );
      patch.subtotal = summen.netto;
      patch.mwst_betrag = summen.mwstBetrag;
      patch.tax_amount = summen.mwstBetrag;
      patch.mwst_gruppen = summen.mwstGruppen;
      patch.total = summen.brutto;
      patch.amount = summen.brutto;
      patch.rabatt_betrag = summen.rabattBetrag;

      // Replace positions
      await supabase.from("document_positions").delete().eq("document_id", id);
      if (positionen.length > 0) {
        const posRows = positionen.map((p, i) => ({
          document_id: id,
          position: i + 1,
          zeilen_typ: p.typ,
          description: p.bezeichnung,
          beschreibung: p.beschreibung || "",
          quantity: p.menge,
          unit: p.einheit,
          unit_price: p.einzelpreis,
          total: p.gesamt,
          mwst_satz: p.mwstSatz,
          rabatt_prozent: p.rabattProzent || null,
          artikel_id: p.artikelId || null,
        }));
        await supabase.from("document_positions").insert(posRows);
      }
    }

    const { error } = await supabase.from("portal_documents").update(patch).eq("id", id);
    if (error) throw error;
    const updated = await this.getById(id);
    if (!updated) throw new Error("Dokument nach Update nicht gefunden (id=" + id + ")");
    return updated;
  },

  // ── Delete ────────────────────────────────────────────────────────────────

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("portal_documents").delete().eq("id", id);
    if (error) throw error;
  },

  // ── Status-Wechsel ────────────────────────────────────────────────────────

  async setStatus(id: string, status: DokumentStatus): Promise<void> {
    const { error } = await supabase
      .from("portal_documents")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw error;
  },

  // ── Umwandlung (Herzstück des Workflows) ──────────────────────────────────

  async umwandeln(quelleId: string, zielTyp: DokumentTyp): Promise<Dokument> {
    const quelle = await this.getById(quelleId);
    if (!quelle) throw new Error("Quelldokument nicht gefunden");

    // Quelle auf "akzeptiert" setzen wenn Angebot
    if (quelle.typ === "angebot") {
      await this.setStatus(quelleId, "akzeptiert");
    }

    // Neues Dokument erstellen
    const zielDoc = await this.create(
      zielTyp,
      {
        datum: new Date().toISOString().split("T")[0],
        status: "entwurf",
        quelldokumentId: quelleId,
        quelldokumentNummer: quelle.nummer,
        customerId: quelle.customerId,
        eventId: quelle.eventId,
        requestId: quelle.requestId,
        showId: quelle.showId,
        produktionId: quelle.produktionId,
        empfaenger: quelle.empfaenger,
        absender: quelle.absender,
        kopftext: quelle.kopftext,
        fusstext: quelle.fusstext,
        zahlungszielTage: quelle.zahlungszielTage,
        rabattProzent: quelle.rabattProzent,
        faelligAm: zielTyp === "rechnung" || zielTyp === "abschlagsrechnung"
          ? addDays(new Date(), quelle.zahlungszielTage)
          : undefined,
      },
      quelle.positionen.map((p) => ({ ...p })),
    );

    // Quelldokument mit Folge-Referenz aktualisieren
    await supabase
      .from("portal_documents")
      .update({ folgedokument_id: zielDoc.id, folgedokument_typ: TYP_COLUMN[zielTyp] })
      .eq("id", quelleId);

    return zielDoc;
  },

  // ── Zahlung erfassen ──────────────────────────────────────────────────────

  async zahlungErfassen(
    dokumentId: string,
    zahlung: Omit<Zahlung, "id">,
  ): Promise<void> {
    const { error } = await supabase.from("dokument_zahlungen").insert({
      dokument_id: dokumentId,
      datum: zahlung.datum,
      betrag: zahlung.betrag,
      zahlungsart: zahlung.zahlungsart,
      notiz: zahlung.notiz || null,
    });
    if (error) throw error;

    // Recalculate paid/open amounts
    const { data: zahlungen } = await supabase
      .from("dokument_zahlungen")
      .select("betrag")
      .eq("dokument_id", dokumentId);

    const bezahlt = (zahlungen || []).reduce((s, z) => s + (z.betrag as number), 0);
    const { data: doc } = await supabase
      .from("portal_documents")
      .select("total")
      .eq("id", dokumentId)
      .maybeSingle();

    const brutto = (doc?.total as number) || 0;
    const offen = Math.max(0, brutto - bezahlt);
    const newStatus: DokumentStatus =
      bezahlt <= 0 ? "offen" :
      bezahlt >= brutto ? "bezahlt" :
      "teilbezahlt";

    await supabase
      .from("portal_documents")
      .update({ bezahlt_betrag: bezahlt, offener_betrag: offen, status: newStatus })
      .eq("id", dokumentId);
  },

  // ── Kennzahlen ────────────────────────────────────────────────────────────

  async getKennzahlen(): Promise<{
    offenBetrag: number;
    ueberfaelligBetrag: number;
    bezahltMonatBetrag: number;
    offenAnzahl: number;
  }> {
    const { data } = await supabase
      .from("portal_documents")
      .select("total, status, faellig_am, due_date, created_at, bezahlt_betrag")
      .in("type", ["Rechnung", "Abschlagsrechnung"]);

    const today = new Date().toISOString().split("T")[0];
    const monthStart = new Date();
    monthStart.setDate(1);

    let offenBetrag = 0, ueberfaelligBetrag = 0, bezahltMonatBetrag = 0, offenAnzahl = 0;

    for (const row of data || []) {
      const status = row.status as string;
      const brutto = (row.total as number) || 0;
      const bezahlt = (row.bezahlt_betrag as number) || 0;
      const offen = brutto - bezahlt;
      const faellig = (row.faellig_am as string) || (row.due_date as string) || "";

      if (status === "offen" || status === "teilbezahlt") {
        offenBetrag += offen;
        offenAnzahl++;
        if (faellig && faellig < today) ueberfaelligBetrag += offen;
      }
      if (status === "bezahlt" && row.created_at >= monthStart.toISOString()) {
        bezahltMonatBetrag += bezahlt;
      }
    }

    return { offenBetrag, ueberfaelligBetrag, bezahltMonatBetrag, offenAnzahl };
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function addDays(date: Date, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

// Anfragen von magicel.de gehen ab jetzt nicht mehr ins alte CRM.
//
// Warum (03.09.2026): Das CRM auf magicel.de wird stillgelegt; Emilian
// arbeitet ab sofort in bookartist. Das Formular schickte seine Anfragen an
// die Funktion `create-portal-request` im alten Supabase-Projekt.
//
// Der direkte Weg nach bookartist geht NICHT: Dessen gleichnamige Funktion
// verlangt seit dem 18.07.2026 ein Kunden-Konto (gegen Identitaetsklau und
// Spam beim Marktplatz). Auf einem Buchungsformular waere das das Ende jeder
// Anfrage — niemand legt vorher ein Konto an. Nachgestellt: HTTP 401,
// {"error":"account_required"}.
//
// Deshalb der Weg, fuer den bookartist ohnehin gebaut ist: Die Anfrage geht
// als Mail in Emilians Postfach (api/anfrage.ts, ueber Resend), und der
// Posteingangs-Abgleich in bookartist macht daraus eine Anfrage.

/** Serverfunktion dieses Projekts — schickt die Anfrage als Mail. */
export const ANFRAGE_ENDPUNKT = "/api/anfrage";

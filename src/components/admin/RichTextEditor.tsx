import { useEffect, useRef, useState } from "react";
import {
  Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, Link, Undo, Redo, ChevronDown,
} from "lucide-react";

export const PLACEHOLDERS = [
  { label: "Kundenname", value: "{{name}}" },
  { label: "Firma", value: "{{firma}}" },
  { label: "E-Mail", value: "{{email}}" },
  { label: "Event Titel", value: "{{event_titel}}" },
  { label: "Event Datum", value: "{{event_datum}}" },
  { label: "Veranstaltungsort", value: "{{event_ort}}" },
  { label: "Anlass", value: "{{anlass}}" },
  { label: "Heute", value: "{{datum_heute}}" },
];

export const replacePlaceholders = (
  html: string,
  data: {
    name?: string | null;
    firma?: string | null;
    email?: string | null;
    event_titel?: string | null;
    event_datum?: string | null;
    event_ort?: string | null;
    anlass?: string | null;
  }
) => {
  const today = new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return html
    .replace(/\{\{name\}\}/g, data.name || "")
    .replace(/\{\{firma\}\}/g, data.firma || "")
    .replace(/\{\{email\}\}/g, data.email || "")
    .replace(/\{\{event_titel\}\}/g, data.event_titel || "")
    .replace(/\{\{event_datum\}\}/g, data.event_datum || "")
    .replace(/\{\{event_ort\}\}/g, data.event_ort || "")
    .replace(/\{\{anlass\}\}/g, data.anlass || "")
    .replace(/\{\{datum_heute\}\}/g, today);
};

/** Convert plain text (with newlines) to basic HTML. If it already contains HTML, return as-is. */
export const textToHtml = (text: string): string => {
  if (!text) return "";
  if (/<[a-z][\s\S]*>/i.test(text)) return text; // already HTML
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .split("\n")
    .join("<br>");
};

/** Strip HTML tags to get plain text */
export const htmlToText = (html: string): string => {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .trim();
};

export interface TextVorlageItem {
  id?: string;
  name: string;
  inhalt: string;
}

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  showPlaceholders?: boolean;
  templates?: TextVorlageItem[];
}

const sep = <div className="w-px h-4 bg-border/30 mx-0.5 shrink-0" />;

const toolbarBtnCls =
  "inline-flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-background/80 transition-colors text-xs font-medium shrink-0";

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Text eingeben…",
  minHeight = "180px",
  showPlaceholders = true,
  templates,
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [showPlaceholderMenu, setShowPlaceholderMenu] = useState(false);
  const templateMenuRef = useRef<HTMLDivElement>(null);
  const placeholderMenuRef = useRef<HTMLDivElement>(null);

  // Sync editor content when value changes externally
  const lastExternalValue = useRef(value);
  useEffect(() => {
    if (!editorRef.current) return;
    // On mount or when value changed externally (not from user typing)
    if (value !== lastExternalValue.current) {
      lastExternalValue.current = value;
      if (editorRef.current.innerHTML !== textToHtml(value)) {
        editorRef.current.innerHTML = textToHtml(value) || "";
      }
    }
  }, [value]);

  // Set content on mount
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = textToHtml(value) || "";
      lastExternalValue.current = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (templateMenuRef.current && !templateMenuRef.current.contains(e.target as Node)) {
        setShowTemplateMenu(false);
      }
      if (placeholderMenuRef.current && !placeholderMenuRef.current.contains(e.target as Node)) {
        setShowPlaceholderMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const emitChange = () => {
    const html = editorRef.current?.innerHTML || "";
    lastExternalValue.current = html;
    onChange(html);
  };

  const exec = (cmd: string, val?: string) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    emitChange();
  };

  const insertPlaceholder = (text: string) => {
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      const node = document.createTextNode(text);
      range.insertNode(node);
      range.setStartAfter(node);
      range.setEndAfter(node);
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      document.execCommand("insertText", false, text);
    }
    emitChange();
    setShowPlaceholderMenu(false);
  };

  const applyTemplate = (vorlage: TextVorlageItem) => {
    const html = textToHtml(vorlage.inhalt);
    if (editorRef.current) {
      editorRef.current.innerHTML = html;
      emitChange();
    }
    setShowTemplateMenu(false);
  };

  return (
    <div className="rounded-xl border border-border/30 overflow-visible">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-muted/30 border-b border-border/20 flex-wrap gap-y-1">

        {/* Font size */}
        <select
          onChange={(e) => exec("fontSize", e.target.value)}
          defaultValue="3"
          className="h-7 rounded-md border border-border/20 bg-background/60 text-xs text-muted-foreground px-1 focus:outline-none cursor-pointer shrink-0"
          title="Schriftgröße"
        >
          <option value="1">8</option>
          <option value="2">10</option>
          <option value="3">12</option>
          <option value="4">14</option>
          <option value="5">18</option>
          <option value="6">24</option>
        </select>

        {sep}

        {/* Basic formatting */}
        <button type="button" onClick={() => exec("bold")} className={toolbarBtnCls} title="Fett (Strg+B)">
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => exec("italic")} className={toolbarBtnCls} title="Kursiv (Strg+I)">
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => exec("underline")} className={toolbarBtnCls} title="Unterstrichen (Strg+U)">
          <Underline className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => exec("strikeThrough")} className={toolbarBtnCls} title="Durchgestrichen">
          <Strikethrough className="w-3.5 h-3.5" />
        </button>

        {sep}

        {/* Lists */}
        <button type="button" onClick={() => exec("insertUnorderedList")} className={toolbarBtnCls} title="Aufzählung">
          <List className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => exec("insertOrderedList")} className={toolbarBtnCls} title="Nummerierte Liste">
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        {sep}

        {/* Alignment */}
        <button type="button" onClick={() => exec("justifyLeft")} className={toolbarBtnCls} title="Linksbündig">
          <AlignLeft className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => exec("justifyCenter")} className={toolbarBtnCls} title="Zentriert">
          <AlignCenter className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => exec("justifyRight")} className={toolbarBtnCls} title="Rechtsbündig">
          <AlignRight className="w-3.5 h-3.5" />
        </button>

        {sep}

        {/* Link */}
        <button type="button" onClick={() => {
          const url = window.prompt("URL eingeben:", "https://");
          if (url) exec("createLink", url);
        }} className={toolbarBtnCls} title="Link einfügen">
          <Link className="w-3.5 h-3.5" />
        </button>

        {sep}

        {/* Undo / Redo */}
        <button type="button" onClick={() => exec("undo")} className={toolbarBtnCls} title="Rückgängig">
          <Undo className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => exec("redo")} className={toolbarBtnCls} title="Wiederholen">
          <Redo className="w-3.5 h-3.5" />
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Textvorlage dropdown */}
        {templates && templates.length > 0 && (
          <div className="relative" ref={templateMenuRef}>
            <button
              type="button"
              onClick={() => { setShowTemplateMenu((v) => !v); setShowPlaceholderMenu(false); }}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-border/30 bg-background/60 text-muted-foreground hover:text-foreground hover:bg-background transition-colors whitespace-nowrap"
            >
              Textvorlage <ChevronDown className="w-3 h-3" />
            </button>
            {showTemplateMenu && (
              <div className="absolute right-0 top-full mt-1 z-50 min-w-[200px] bg-background border border-border/30 rounded-xl shadow-lg overflow-hidden">
                {templates.map((v, i) => (
                  <button
                    key={v.id ?? i}
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); applyTemplate(v); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted/60 transition-colors"
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Platzhalter dropdown */}
        {showPlaceholders && (
          <div className="relative" ref={placeholderMenuRef}>
            <button
              type="button"
              onClick={() => { setShowPlaceholderMenu((v) => !v); setShowTemplateMenu(false); }}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-border/30 bg-background/60 text-muted-foreground hover:text-foreground hover:bg-background transition-colors whitespace-nowrap"
            >
              Platzhalter <ChevronDown className="w-3 h-3" />
            </button>
            {showPlaceholderMenu && (
              <div className="absolute right-0 top-full mt-1 z-50 min-w-[180px] bg-background border border-border/30 rounded-xl shadow-lg overflow-hidden">
                {PLACEHOLDERS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); insertPlaceholder(p.value); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted/60 transition-colors flex items-center justify-between gap-3"
                  >
                    <span>{p.label}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{p.value}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => emitChange()}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className="px-4 py-3 text-sm text-foreground bg-background/60 focus:outline-none leading-relaxed
          empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground/50 empty:before:pointer-events-none"
      />
    </div>
  );
};

export default RichTextEditor;

import { useEffect, useRef } from "react";
import { Bold, Italic, Underline, List } from "lucide-react";

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

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  showPlaceholders?: boolean;
}

const toolbarBtnCls =
  "inline-flex items-center justify-center w-7 h-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-colors text-xs font-medium";

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Text eingeben…",
  minHeight = "180px",
  showPlaceholders = true,
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exec = (cmd: string, val?: string) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    onChange(editorRef.current?.innerHTML || "");
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
    onChange(editorRef.current?.innerHTML || "");
  };

  return (
    <div className="rounded-xl border border-border/30 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-muted/30 border-b border-border/20 flex-wrap gap-y-1">
        <button type="button" onClick={() => exec("bold")} className={toolbarBtnCls} title="Fett">
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => exec("italic")} className={toolbarBtnCls} title="Kursiv">
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => exec("underline")} className={toolbarBtnCls} title="Unterstrichen">
          <Underline className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => exec("insertUnorderedList")} className={toolbarBtnCls} title="Liste">
          <List className="w-3.5 h-3.5" />
        </button>

        {showPlaceholders && (
          <>
            <div className="w-px h-4 bg-border/30 mx-1" />
            <span className="font-sans text-[10px] text-muted-foreground mr-1">Platzhalter:</span>
            {PLACEHOLDERS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => insertPlaceholder(p.value)}
                className="font-sans text-[10px] px-2 py-1 rounded-md bg-accent/10 text-accent hover:bg-accent/20 transition-colors whitespace-nowrap"
              >
                {p.label}
              </button>
            ))}
          </>
        )}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => onChange(editorRef.current?.innerHTML || "")}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className="px-4 py-3 text-sm text-foreground bg-background/60 focus:outline-none leading-relaxed
          empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground/50 empty:before:pointer-events-none"
      />
    </div>
  );
};

export default RichTextEditor;

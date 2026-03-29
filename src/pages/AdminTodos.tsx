import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Check, LogOut, Calendar, Circle, CheckCircle2 } from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  due_date: string | null;
  created_at: string;
}

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const statusOptions = [
  { value: "offen", label: "Offen", cls: "text-foreground bg-muted" },
  { value: "in_bearbeitung", label: "In Bearbeitung", cls: "text-accent bg-accent/10" },
  { value: "erledigt", label: "Erledigt", cls: "text-green-700 bg-green-100" },
];

const AdminTodos = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"alle" | "offen" | "in_bearbeitung" | "erledigt">("offen");

  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDue, setNewDue] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) { navigate("/admin/login"); return; }
      setUser(session.user);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate("/admin/login"); return; }
      setUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user?.email) return;
    const load = async () => {
      setLoading(true);
      const { data: admin } = await supabase
        .from("portal_admins").select("id").eq("email", user.email!).maybeSingle();
      if (!admin) { setIsAdmin(false); setLoading(false); return; }
      setIsAdmin(true);

      const { data } = await supabase
        .from("portal_todos").select("*").order("due_date", { ascending: true, nullsFirst: false });
      if (data) setTodos(data);
      setLoading(false);
    };
    load();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const addTodo = async () => {
    if (!newTitle.trim()) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("portal_todos")
      .insert({ title: newTitle.trim(), description: newDesc.trim() || null, due_date: newDue || null, status: "offen" })
      .select("*").single();
    if (!error && data) {
      setTodos((prev) => [data, ...prev]);
      setNewTitle(""); setNewDesc(""); setNewDue("");
      setShowNew(false);
    }
    setSaving(false);
  };

  const toggleStatus = async (todo: Todo) => {
    const next = todo.status === "erledigt" ? "offen" : "erledigt";
    const { data, error } = await supabase
      .from("portal_todos").update({ status: next }).eq("id", todo.id).select("*").single();
    if (!error && data) setTodos((prev) => prev.map((t) => (t.id === todo.id ? data : t)));
  };

  const setTodoStatus = async (todo: Todo, status: string) => {
    const { data, error } = await supabase
      .from("portal_todos").update({ status }).eq("id", todo.id).select("*").single();
    if (!error && data) setTodos((prev) => prev.map((t) => (t.id === todo.id ? data : t)));
  };

  const deleteTodo = async (id: string) => {
    await supabase.from("portal_todos").delete().eq("id", id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const filtered = filter === "alle" ? todos : todos.filter((t) => t.status === filter);
  const openCount = todos.filter((t) => t.status !== "erledigt").length;

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  return (
    <AdminLayout
      title="Todos"
      subtitle={`${openCount} offene Aufgabe${openCount !== 1 ? "n" : ""}`}
      actions={
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNew(!showNew)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Neue Aufgabe
          </button>
          <button onClick={logout} className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" /> Abmelden
          </button>
        </div>
      }
    >
      {/* New Todo Form */}
      {showNew && (
        <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 space-y-4 mb-6">
          <h3 className="font-display text-base font-bold text-foreground">Neue Aufgabe</h3>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Titel der Aufgabe *"
            className={inputCls}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Beschreibung (optional)"
            rows={2}
            className={inputCls + " resize-none"}
          />
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Fälligkeitsdatum</label>
              <input type="date" value={newDue} onChange={(e) => setNewDue(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={addTodo} disabled={saving || !newTitle.trim()} className="btn-primary disabled:opacity-60">
              <Check className="w-4 h-4 mr-2" />{saving ? "Speichert…" : "Hinzufügen"}
            </button>
            <button
              onClick={() => { setShowNew(false); setNewTitle(""); setNewDesc(""); setNewDue(""); }}
              className="inline-flex items-center font-sans text-sm text-muted-foreground hover:text-foreground border border-border/40 rounded-xl px-4 py-2.5 transition-colors"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-muted/40 rounded-2xl p-1 mb-6 w-fit">
        {[
          { id: "offen", label: "Offen" },
          { id: "in_bearbeitung", label: "In Bearbeitung" },
          { id: "erledigt", label: "Erledigt" },
          { id: "alle", label: "Alle" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`font-sans text-sm px-4 py-2 rounded-xl transition-all ${
              filter === f.id ? "bg-background shadow-sm text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
            {f.id === "offen" && openCount > 0 && (
              <span className="ml-2 font-sans text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full">
                {openCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-10 rounded-3xl bg-muted/20 border border-border/30 text-center">
            <p className="font-sans text-sm text-muted-foreground">
              {filter === "erledigt" ? "Noch nichts erledigt." : "Keine offenen Aufgaben."}
            </p>
          </div>
        ) : (
          filtered.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors ${
                todo.status === "erledigt"
                  ? "bg-muted/10 border-border/20 opacity-60"
                  : "bg-muted/20 border-border/30 hover:border-accent/20"
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleStatus(todo)}
                className="mt-0.5 shrink-0 transition-transform hover:scale-110"
              >
                {todo.status === "erledigt" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground/40" />
                )}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`font-sans text-sm font-semibold ${todo.status === "erledigt" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {todo.title}
                </p>
                {todo.description && (
                  <p className="font-sans text-xs text-muted-foreground mt-1 leading-relaxed">{todo.description}</p>
                )}
                {todo.due_date && (
                  <p className="font-sans text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Fällig: {new Date(todo.due_date).toLocaleDateString("de-DE")}
                  </p>
                )}
              </div>

              {/* Status + Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={todo.status || "offen"}
                  onChange={(e) => setTodoStatus(todo, e.target.value)}
                  className="font-sans text-[11px] uppercase tracking-widest rounded-lg px-2 py-1 border border-border/30 bg-background/60 text-foreground focus:outline-none cursor-pointer"
                >
                  {statusOptions.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-lg hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminTodos;

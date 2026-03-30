import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Check, Calendar, Circle, CheckCircle2, User, Pencil, X } from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  due_date: string | null;
  created_at: string;
  customer_id: string | null;
  priority: string | null;
  customer?: { id: string; name: string | null } | null;
}

interface Customer {
  id: string;
  name: string | null;
  company: string | null;
}

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const statusOptions = [
  { value: "offen", label: "Offen" },
  { value: "in_bearbeitung", label: "In Bearbeitung" },
  { value: "erledigt", label: "Erledigt" },
];

const priorityOptions = [
  { value: "hoch", label: "Hoch" },
  { value: "mittel", label: "Mittel" },
  { value: "niedrig", label: "Niedrig" },
];

const priorityOrder: Record<string, number> = { hoch: 0, mittel: 1, niedrig: 2 };

const PriorityDot = ({ priority }: { priority: string | null }) => {
  const p = priority ?? "mittel";
  const colorCls =
    p === "hoch"
      ? "bg-red-500"
      : p === "niedrig"
      ? "bg-gray-400"
      : "bg-orange-400";
  const title = p === "hoch" ? "Hoch" : p === "niedrig" ? "Niedrig" : "Mittel";
  return (
    <span
      title={`Priorität: ${title}`}
      className={`inline-block w-2 h-2 rounded-full shrink-0 mt-1.5 ${colorCls}`}
    />
  );
};

const isDueToday = (dateStr: string | null) => {
  if (!dateStr) return false;
  const today = new Date();
  const due = new Date(dateStr);
  return due.toDateString() === today.toDateString();
};

const isOverdue = (dateStr: string | null) => {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr) < today;
};

const sortTodos = (todos: Todo[]) =>
  [...todos].sort((a, b) => {
    const pa = priorityOrder[a.priority ?? "mittel"] ?? 1;
    const pb = priorityOrder[b.priority ?? "mittel"] ?? 1;
    if (pa !== pb) return pa - pb;
    if (a.due_date && b.due_date) {
      const diff = new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      if (diff !== 0) return diff;
    }
    if (a.due_date && !b.due_date) return -1;
    if (!a.due_date && b.due_date) return 1;
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

const AdminTodos = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filter, setFilter] = useState<"alle" | "offen" | "in_bearbeitung" | "erledigt">("offen");

  // Create form
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDue, setNewDue] = useState("");
  const [newCustomerId, setNewCustomerId] = useState("");
  const [newStatus, setNewStatus] = useState("offen");
  const [newPriority, setNewPriority] = useState("mittel");
  const [saving, setSaving] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDue, setEditDue] = useState("");
  const [editCustomerId, setEditCustomerId] = useState("");
  const [editStatus, setEditStatus] = useState("offen");
  const [editPriority, setEditPriority] = useState("mittel");
  const [editSaving, setEditSaving] = useState(false);

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

      const [todosRes, custRes] = await Promise.all([
        supabase
          .from("portal_todos")
          .select("*, customer:customer_id(id, name)"),
        supabase.from("portal_customers").select("id, name, company").order("name"),
      ]);

      if (todosRes.data) setTodos(sortTodos(todosRes.data));
      if (custRes.data) setCustomers(custRes.data);
      setLoading(false);
    };
    load();
  }, [user]);

  const addTodo = async () => {
    if (!newTitle.trim()) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("portal_todos")
      .insert({
        title: newTitle.trim(),
        description: newDesc.trim() || null,
        due_date: newDue || null,
        status: newStatus,
        customer_id: newCustomerId || null,
        priority: newPriority,
      })
      .select("*, customer:customer_id(id, name)")
      .single();
    if (!error && data) {
      setTodos((prev) => sortTodos([data, ...prev]));
      setNewTitle(""); setNewDesc(""); setNewDue(""); setNewCustomerId("");
      setNewStatus("offen"); setNewPriority("mittel");
      setShowNew(false);
    }
    setSaving(false);
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDesc(todo.description ?? "");
    setEditDue(todo.due_date ?? "");
    setEditCustomerId(todo.customer_id ?? "");
    setEditStatus(todo.status ?? "offen");
    setEditPriority(todo.priority ?? "mittel");
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id: string) => {
    if (!editTitle.trim()) return;
    setEditSaving(true);
    const { data, error } = await supabase
      .from("portal_todos")
      .update({
        title: editTitle.trim(),
        description: editDesc.trim() || null,
        due_date: editDue || null,
        status: editStatus,
        customer_id: editCustomerId || null,
        priority: editPriority,
      })
      .eq("id", id)
      .select("*, customer:customer_id(id, name)")
      .single();
    if (!error && data) {
      setTodos((prev) => sortTodos(prev.map((t) => (t.id === id ? data : t))));
      setEditingId(null);
    }
    setEditSaving(false);
  };

  const toggleStatus = async (todo: Todo) => {
    const next = todo.status === "erledigt" ? "offen" : "erledigt";
    const { data, error } = await supabase
      .from("portal_todos").update({ status: next }).eq("id", todo.id).select("*, customer:customer_id(id, name)").single();
    if (!error && data) setTodos((prev) => sortTodos(prev.map((t) => t.id === todo.id ? data : t)));
  };

  const setTodoStatus = async (todo: Todo, status: string) => {
    const { data, error } = await supabase
      .from("portal_todos").update({ status }).eq("id", todo.id).select("*, customer:customer_id(id, name)").single();
    if (!error && data) setTodos((prev) => sortTodos(prev.map((t) => t.id === todo.id ? data : t)));
  };

  const deleteTodo = async (id: string) => {
    await supabase.from("portal_todos").delete().eq("id", id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const filtered = filter === "alle" ? todos : todos.filter((t) => t.status === filter);
  const openCount = todos.filter((t) => t.status !== "erledigt").length;
  const overdueCount = todos.filter((t) => t.status !== "erledigt" && isOverdue(t.due_date)).length;

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  return (
    <AdminLayout
      title="Todos"
      subtitle={`${openCount} offen${overdueCount > 0 ? ` · ${overdueCount} überfällig` : ""}`}
      actions={
        <button
          onClick={() => setShowNew(!showNew)}
          className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-80 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Neue Aufgabe
        </button>
      }
    >
      {/* New Todo Form */}
      {showNew && (
        <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20 space-y-3 mb-6">
          <h3 className="text-sm font-bold text-foreground">Neue Aufgabe</h3>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Titel *"
            className={inputCls}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            autoFocus
          />
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Beschreibung (optional)"
            rows={2}
            className={inputCls + " resize-none"}
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Fälligkeitsdatum</label>
              <input type="date" value={newDue} onChange={(e) => setNewDue(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Kunde (optional)</label>
              <select value={newCustomerId} onChange={(e) => setNewCustomerId(e.target.value)} className={inputCls}>
                <option value="">— Kein Kunde —</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name || "Unbekannt"}{c.company ? ` · ${c.company}` : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Status</label>
              <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className={inputCls}>
                {statusOptions.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Priorität</label>
              <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)} className={inputCls}>
                {priorityOptions.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={addTodo} disabled={saving || !newTitle.trim()} className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-80 disabled:opacity-40 transition-opacity">
              <Check className="w-4 h-4" />{saving ? "Speichert…" : "Hinzufügen"}
            </button>
            <button
              onClick={() => { setShowNew(false); setNewTitle(""); setNewDesc(""); setNewDue(""); setNewCustomerId(""); setNewStatus("offen"); setNewPriority("mittel"); }}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground border border-border/40 rounded-xl px-4 py-2 transition-colors"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-muted/40 rounded-xl p-1 mb-5 w-fit">
        {[
          { id: "offen", label: "Offen" },
          { id: "in_bearbeitung", label: "In Bearbeitung" },
          { id: "erledigt", label: "Erledigt" },
          { id: "alle", label: "Alle" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`text-sm px-3 py-1.5 rounded-lg transition-all ${
              filter === f.id ? "bg-background shadow-sm text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
            {f.id === "offen" && openCount > 0 && (
              <span className="ml-1.5 text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full">
                {openCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="p-10 rounded-2xl bg-muted/20 border border-border/30 text-center">
            <p className="text-sm text-muted-foreground">
              {filter === "erledigt" ? "Noch nichts erledigt." : "Keine offenen Aufgaben."}
            </p>
          </div>
        ) : (
          filtered.map((todo) => {
            const cust = todo.customer as any;
            const overdue = isOverdue(todo.due_date) && todo.status !== "erledigt";
            const dueToday = isDueToday(todo.due_date) && todo.status !== "erledigt";
            const isEditing = editingId === todo.id;

            return (
              <div
                key={todo.id}
                className={`rounded-xl border transition-colors ${
                  todo.status === "erledigt"
                    ? "bg-muted/10 border-border/20 opacity-60"
                    : overdue
                    ? "bg-destructive/5 border-destructive/20"
                    : "bg-muted/20 border-border/30 hover:border-accent/20"
                }`}
              >
                {/* Normal row */}
                {!isEditing && (
                  <div className="flex items-start gap-3 p-4">
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

                    {/* Priority dot */}
                    <PriorityDot priority={todo.priority} />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${todo.status === "erledigt" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {todo.title}
                      </p>
                      {todo.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{todo.description}</p>
                      )}
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
                        {todo.due_date && (
                          <p className={`text-xs flex items-center gap-1 ${overdue ? "text-destructive font-medium" : dueToday ? "text-orange-600 font-medium" : "text-muted-foreground"}`}>
                            <Calendar className="w-3 h-3" />
                            {overdue ? "Überfällig: " : dueToday ? "Heute: " : "Fällig: "}
                            {new Date(todo.due_date).toLocaleDateString("de-DE")}
                          </p>
                        )}
                        {cust && (
                          <Link
                            to={`/admin/customers/${cust.id}`}
                            className="text-xs text-accent hover:text-accent/80 flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <User className="w-3 h-3" />
                            {cust.name || "Kunde"}
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Status + Edit + Delete */}
                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={todo.status || "offen"}
                        onChange={(e) => setTodoStatus(todo, e.target.value)}
                        className="text-[11px] uppercase tracking-widest rounded-lg px-2 py-1 border border-border/30 bg-background/60 text-foreground focus:outline-none cursor-pointer"
                      >
                        {statusOptions.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => startEdit(todo)}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted/40"
                        title="Bearbeiten"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-lg hover:bg-destructive/10"
                        title="Löschen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Edit form */}
                {isEditing && (
                  <div className="p-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Aufgabe bearbeiten</h4>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Titel *"
                      className={inputCls}
                      autoFocus
                    />
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      placeholder="Beschreibung (optional)"
                      rows={2}
                      className={inputCls + " resize-none"}
                    />
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Fälligkeitsdatum</label>
                        <input type="date" value={editDue} onChange={(e) => setEditDue(e.target.value)} className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Kunde (optional)</label>
                        <select value={editCustomerId} onChange={(e) => setEditCustomerId(e.target.value)} className={inputCls}>
                          <option value="">— Kein Kunde —</option>
                          {customers.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name || "Unbekannt"}{c.company ? ` · ${c.company}` : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Status</label>
                        <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className={inputCls}>
                          {statusOptions.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Priorität</label>
                        <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)} className={inputCls}>
                          {priorityOptions.map((p) => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(todo.id)}
                        disabled={editSaving || !editTitle.trim()}
                        className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-80 disabled:opacity-40 transition-opacity"
                      >
                        <Check className="w-4 h-4" />{editSaving ? "Speichert…" : "Speichern"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground border border-border/40 rounded-xl px-4 py-2 transition-colors"
                      >
                        <X className="w-4 h-4" /> Abbrechen
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminTodos;

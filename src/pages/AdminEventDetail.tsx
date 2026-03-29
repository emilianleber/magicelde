// src/pages/AdminEventDetail.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

const AdminEventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState<any>(null);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [format, setFormat] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("portal_events")
        .select("*")
        .eq("id", id)
        .single();

      setEvent(data);
      setDate(data?.event_date || "");
      setStartTime(data?.start_time || "");
      setEndTime(data?.end_time || "");
      setLocation(data?.location || "");
      setFormat(data?.format || "");
    };

    load();
  }, [id]);

  const save = async () => {
    await supabase
      .from("portal_events")
      .update({
        event_date: date,
        start_time: startTime,
        end_time: endTime,
        location,
        format,
      })
      .eq("id", id);
  };

  if (!event) return null;

  return (
    <AdminLayout title={`${event.event_type} · ${event.firma || event.customer_name}`}>

      {/* NICHT EDITIERBAR */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">{event.event_type}</h2>
        <p>{event.firma || event.customer_name}</p>
      </div>

      {/* EDITIERBAR */}
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />

      <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />

      <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />

      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Ort" />

      {/* FORMAT DROPDOWN */}
      <select value={format} onChange={e => setFormat(e.target.value)}>
        <option value="">Format wählen</option>
        <option value="closeup">Close-Up</option>
        <option value="buehne">Bühne</option>
        <option value="walking">Walking</option>
        <option value="dinner">Magic Dinner</option>
      </select>

      <button onClick={save}>Speichern</button>

    </AdminLayout>
  );
};

export default AdminEventDetail;
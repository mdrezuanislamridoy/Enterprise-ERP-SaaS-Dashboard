import React, { useState, useEffect } from 'react';
import { BarChart2, Plus, X, MoreHorizontal } from 'lucide-react';
import { GenericModal } from '../../components/common/GenericModal';
import { StatusBadge } from '../../components/common/StatusBadge';

export function DeliveryReportsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form, setForm] = useState({ project: '', client: '', status: 'In Progress', completion: '', dueDate: '' });
  const [editing, setEditing] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetch('/api/delivery-reports').then(r => r.json()).then(d => { setItems(d.items || []); setLoading(false); }).catch(console.error); }, []);

  const handleCreate = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); try { const r = await fetch('/api/delivery-reports', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); const d = await r.json(); if (d.item) { setItems([...items, d.item]); setIsModalOpen(false); } } finally { setSubmitting(false); } };
  const handleEdit = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); try { const r = await fetch(`/api/delivery-reports/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) }); const d = await r.json(); if (d.item) { setItems(items.map(i => i.id === editing.id ? d.item : i)); setIsEditOpen(false); } } finally { setSubmitting(false); } };
  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await fetch(`/api/delivery-reports/${id}`, { method: 'DELETE' }); setItems(items.filter(i => i.id !== id)); };

  if (loading) return <div className="p-6">Loading...</div>;
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart2 /> Delivery Reports</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"><Plus size={16} /> Add Report</button>
      </div>
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-b border-border"><tr>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Project</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Client</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Completion</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Due Date</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>{items.map(i => (
            <tr key={i.id} className="border-b border-border hover:bg-muted/30">
              <td className="px-5 py-3.5 font-medium">{i.project}</td>
              <td className="px-5 py-3.5">{i.client}</td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${i.completion}%` }} /></div>
                  <span className="text-xs">{i.completion}%</span>
                </div>
              </td>
              <td className="px-5 py-3.5"><StatusBadge status={i.status} /></td>
              <td className="px-5 py-3.5 text-xs">{i.dueDate}</td>
              <td className="px-5 py-3.5 flex gap-2">
                <button onClick={() => { setEditing(i); setIsEditOpen(true); }}><MoreHorizontal size={14} /></button>
                <button onClick={() => handleDelete(i.id)} className="text-red-500"><X size={14} /></button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Report">
        <form onSubmit={handleCreate} className="space-y-4">
          <input required placeholder="Project" value={form.project} onChange={e => setForm({...form, project: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Client" value={form.client} onChange={e => setForm({...form, client: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" min="0" max="100" placeholder="Completion %" value={form.completion} onChange={e => setForm({...form, completion: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>In Progress</option><option>Completed</option><option>Delayed</option></select>
          <input required placeholder="Due Date" value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Create</button>
        </form>
      </GenericModal>
      <GenericModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Report">
        {editing && <form onSubmit={handleEdit} className="space-y-4">
          <input required value={editing.project} onChange={e => setEditing({...editing, project: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editing.client} onChange={e => setEditing({...editing, client: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" value={editing.completion} onChange={e => setEditing({...editing, completion: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={editing.status} onChange={e => setEditing({...editing, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>In Progress</option><option>Completed</option><option>Delayed</option></select>
          <input required value={editing.dueDate} onChange={e => setEditing({...editing, dueDate: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Save</button>
        </form>}
      </GenericModal>
    </div>
  );
}

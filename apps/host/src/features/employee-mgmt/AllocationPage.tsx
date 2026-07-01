import React, { useState, useEffect } from 'react';
import { CalendarDays, Plus, X, MoreHorizontal } from 'lucide-react';
import { GenericModal } from '../../components/common/GenericModal';

export function AllocationPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form, setForm] = useState({ employee: '', project: '', role: '', hours: '40', startDate: '', endDate: '' });
  const [editing, setEditing] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetch('/api/allocation').then(r => r.json()).then(d => { setItems(d.items || []); setLoading(false); }).catch(console.error); }, []);

  const handleCreate = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); try { const r = await fetch('/api/allocation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); const d = await r.json(); if (d.item) { setItems([...items, d.item]); setIsModalOpen(false); } } finally { setSubmitting(false); } };
  const handleEdit = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); try { const r = await fetch(`/api/allocation/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) }); const d = await r.json(); if (d.item) { setItems(items.map(i => i.id === editing.id ? d.item : i)); setIsEditOpen(false); } } finally { setSubmitting(false); } };
  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await fetch(`/api/allocation/${id}`, { method: 'DELETE' }); setItems(items.filter(i => i.id !== id)); };

  if (loading) return <div className="p-6">Loading...</div>;
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><CalendarDays /> Project Allocation</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"><Plus size={16} /> Allocate</button>
      </div>
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-b border-border"><tr>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Employee</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Project</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Role</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Hours/wk</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Start</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">End</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>{items.map(i => (
            <tr key={i.id} className="border-b border-border hover:bg-muted/30">
              <td className="px-5 py-3.5 font-medium">{i.employee}</td>
              <td className="px-5 py-3.5">{i.project}</td>
              <td className="px-5 py-3.5">{i.role}</td>
              <td className="px-5 py-3.5">{i.hours}h</td>
              <td className="px-5 py-3.5 text-xs">{i.startDate}</td>
              <td className="px-5 py-3.5 text-xs">{i.endDate}</td>
              <td className="px-5 py-3.5 flex gap-2">
                <button onClick={() => { setEditing(i); setIsEditOpen(true); }}><MoreHorizontal size={14} /></button>
                <button onClick={() => handleDelete(i.id)} className="text-red-500"><X size={14} /></button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Allocate Employee">
        <form onSubmit={handleCreate} className="space-y-4">
          <input required placeholder="Employee" value={form.employee} onChange={e => setForm({...form, employee: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Project" value={form.project} onChange={e => setForm({...form, project: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Role" value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" placeholder="Hours/week" value={form.hours} onChange={e => setForm({...form, hours: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Start Date" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="End Date" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Create</button>
        </form>
      </GenericModal>
      <GenericModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Allocation">
        {editing && <form onSubmit={handleEdit} className="space-y-4">
          <input required value={editing.employee} onChange={e => setEditing({...editing, employee: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editing.project} onChange={e => setEditing({...editing, project: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editing.role} onChange={e => setEditing({...editing, role: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" value={editing.hours} onChange={e => setEditing({...editing, hours: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editing.startDate} onChange={e => setEditing({...editing, startDate: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editing.endDate} onChange={e => setEditing({...editing, endDate: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Save</button>
        </form>}
      </GenericModal>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Key, Plus, X, MoreHorizontal } from 'lucide-react';
import { GenericModal } from '../../components/common/GenericModal';
import { StatusBadge } from '../../components/common/StatusBadge';

export function LicensesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form, setForm] = useState({ software: '', vendor: '', seats: '', cost: '', renewalDate: '', status: 'Active' });
  const [editing, setEditing] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetch('/api/licenses').then(r => r.json()).then(d => { setItems(d.items || []); setLoading(false); }).catch(console.error); }, []);

  const handleCreate = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); try { const r = await fetch('/api/licenses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); const d = await r.json(); if (d.item) { setItems([...items, d.item]); setIsModalOpen(false); } } finally { setSubmitting(false); } };
  const handleEdit = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); try { const r = await fetch(`/api/licenses/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) }); const d = await r.json(); if (d.item) { setItems(items.map(i => i.id === editing.id ? d.item : i)); setIsEditOpen(false); } } finally { setSubmitting(false); } };
  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await fetch(`/api/licenses/${id}`, { method: 'DELETE' }); setItems(items.filter(i => i.id !== id)); };

  if (loading) return <div className="p-6">Loading...</div>;
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Key /> Software Licenses</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"><Plus size={16} /> Add License</button>
      </div>
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-b border-border"><tr>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Software</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Vendor</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Seats</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Cost</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Renewal</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>{items.map(i => (
            <tr key={i.id} className="border-b border-border hover:bg-muted/30">
              <td className="px-5 py-3.5 font-medium">{i.software}</td>
              <td className="px-5 py-3.5">{i.vendor}</td>
              <td className="px-5 py-3.5">{i.seats}</td>
              <td className="px-5 py-3.5 font-semibold">{i.cost}</td>
              <td className="px-5 py-3.5 text-xs">{i.renewalDate}</td>
              <td className="px-5 py-3.5"><StatusBadge status={i.status} /></td>
              <td className="px-5 py-3.5 flex gap-2">
                <button onClick={() => { setEditing(i); setIsEditOpen(true); }}><MoreHorizontal size={14} /></button>
                <button onClick={() => handleDelete(i.id)} className="text-red-500"><X size={14} /></button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add License">
        <form onSubmit={handleCreate} className="space-y-4">
          <input required placeholder="Software Name" value={form.software} onChange={e => setForm({...form, software: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Vendor" value={form.vendor} onChange={e => setForm({...form, vendor: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" placeholder="Seats" value={form.seats} onChange={e => setForm({...form, seats: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Cost (e.g. $500/yr)" value={form.cost} onChange={e => setForm({...form, cost: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Renewal Date" value={form.renewalDate} onChange={e => setForm({...form, renewalDate: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Active</option><option>Expiring</option><option>Expired</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Create</button>
        </form>
      </GenericModal>
      <GenericModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit License">
        {editing && <form onSubmit={handleEdit} className="space-y-4">
          <input required value={editing.software} onChange={e => setEditing({...editing, software: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editing.vendor} onChange={e => setEditing({...editing, vendor: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" value={editing.seats} onChange={e => setEditing({...editing, seats: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editing.cost} onChange={e => setEditing({...editing, cost: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editing.renewalDate} onChange={e => setEditing({...editing, renewalDate: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={editing.status} onChange={e => setEditing({...editing, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Active</option><option>Expiring</option><option>Expired</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Save</button>
        </form>}
      </GenericModal>
    </div>
  );
}

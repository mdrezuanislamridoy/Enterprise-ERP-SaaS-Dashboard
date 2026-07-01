import React, { useState, useEffect } from 'react';
import { Award, Plus, X, MoreHorizontal } from 'lucide-react';
import { GenericModal } from '../../components/common/GenericModal';
import { StatusBadge } from '../../components/common/StatusBadge';

export function PerformancePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form, setForm] = useState({ employee: '', period: '', score: '', rating: 'Good', notes: '' });
  const [editing, setEditing] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetch('/api/performance').then(r => r.json()).then(d => { setItems(d.items || []); setLoading(false); }).catch(console.error); }, []);

  const handleCreate = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); try { const r = await fetch('/api/performance', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); const d = await r.json(); if (d.item) { setItems([...items, d.item]); setIsModalOpen(false); } } finally { setSubmitting(false); } };
  const handleEdit = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); try { const r = await fetch(`/api/performance/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) }); const d = await r.json(); if (d.item) { setItems(items.map(i => i.id === editing.id ? d.item : i)); setIsEditOpen(false); } } finally { setSubmitting(false); } };
  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await fetch(`/api/performance/${id}`, { method: 'DELETE' }); setItems(items.filter(i => i.id !== id)); };

  if (loading) return <div className="p-6">Loading...</div>;
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Award /> Performance Reviews</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"><Plus size={16} /> Add Review</button>
      </div>
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-b border-border"><tr>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Employee</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Period</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Score</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Rating</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Notes</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>{items.map(i => (
            <tr key={i.id} className="border-b border-border hover:bg-muted/30">
              <td className="px-5 py-3.5 font-medium">{i.employee}</td>
              <td className="px-5 py-3.5">{i.period}</td>
              <td className="px-5 py-3.5 font-semibold">{i.score}/100</td>
              <td className="px-5 py-3.5"><StatusBadge status={i.rating} /></td>
              <td className="px-5 py-3.5 text-xs text-muted-foreground max-w-[200px] truncate">{i.notes}</td>
              <td className="px-5 py-3.5 flex gap-2">
                <button onClick={() => { setEditing(i); setIsEditOpen(true); }}><MoreHorizontal size={14} /></button>
                <button onClick={() => handleDelete(i.id)} className="text-red-500"><X size={14} /></button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Review">
        <form onSubmit={handleCreate} className="space-y-4">
          <input required placeholder="Employee" value={form.employee} onChange={e => setForm({...form, employee: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Period (e.g. Q1 2026)" value={form.period} onChange={e => setForm({...form, period: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" min="0" max="100" placeholder="Score (0-100)" value={form.score} onChange={e => setForm({...form, score: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Outstanding</option><option>Excellent</option><option>Good</option><option>Needs Improvement</option></select>
          <textarea placeholder="Notes" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="w-full border rounded p-2 text-sm" rows={3} />
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Create</button>
        </form>
      </GenericModal>
      <GenericModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Review">
        {editing && <form onSubmit={handleEdit} className="space-y-4">
          <input required value={editing.employee} onChange={e => setEditing({...editing, employee: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editing.period} onChange={e => setEditing({...editing, period: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" value={editing.score} onChange={e => setEditing({...editing, score: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={editing.rating} onChange={e => setEditing({...editing, rating: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Outstanding</option><option>Excellent</option><option>Good</option><option>Needs Improvement</option></select>
          <textarea value={editing.notes || ''} onChange={e => setEditing({...editing, notes: e.target.value})} className="w-full border rounded p-2 text-sm" rows={3} />
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Save</button>
        </form>}
      </GenericModal>
    </div>
  );
}

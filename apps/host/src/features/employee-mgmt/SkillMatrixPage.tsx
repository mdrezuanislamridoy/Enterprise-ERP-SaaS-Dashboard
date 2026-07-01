import React, { useState, useEffect } from 'react';
import { Layers, Plus, X, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { GenericModal } from '../../components/common/GenericModal';

export function SkillMatrixPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form, setForm] = useState({ employee: '', skill: '', level: 'Beginner', certified: false });
  const [editing, setEditing] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetch('/api/skill-matrix').then(r => r.json()).then(d => { setItems(d.items || []); setLoading(false); }).catch(console.error); }, []);

  const handleCreate = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); try { const r = await fetch('/api/skill-matrix', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); const d = await r.json(); if (d.item) { setItems([...items, d.item]); setIsModalOpen(false); } } finally { setSubmitting(false); } };
  const handleEdit = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); try { const r = await fetch(`/api/skill-matrix/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) }); const d = await r.json(); if (d.item) { setItems(items.map(i => i.id === editing.id ? d.item : i)); setIsEditOpen(false); } } finally { setSubmitting(false); } };
  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await fetch(`/api/skill-matrix/${id}`, { method: 'DELETE' }); setItems(items.filter(i => i.id !== id)); };

  if (loading) return <div className="p-6">Loading...</div>;
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Layers /> Skill Matrix</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"><Plus size={16} /> Add Skill</button>
      </div>
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-b border-border"><tr>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Employee</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Skill</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Level</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Certified</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>{items.map(i => (
            <tr key={i.id} className="border-b border-border hover:bg-muted/30">
              <td className="px-5 py-3.5 font-medium">{i.employee}</td>
              <td className="px-5 py-3.5">{i.skill}</td>
              <td className="px-5 py-3.5"><span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">{i.level}</span></td>
              <td className="px-5 py-3.5">{i.certified ? <CheckCircle2 size={16} className="text-emerald-500" /> : '—'}</td>
              <td className="px-5 py-3.5 flex gap-2">
                <button onClick={() => { setEditing(i); setIsEditOpen(true); }}><MoreHorizontal size={14} /></button>
                <button onClick={() => handleDelete(i.id)} className="text-red-500"><X size={14} /></button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Skill">
        <form onSubmit={handleCreate} className="space-y-4">
          <input required placeholder="Employee Name" value={form.employee} onChange={e => setForm({...form, employee: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Skill" value={form.skill} onChange={e => setForm({...form, skill: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={form.level} onChange={e => setForm({...form, level: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Expert</option></select>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.certified} onChange={e => setForm({...form, certified: e.target.checked})} /> Certified</label>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Create</button>
        </form>
      </GenericModal>
      <GenericModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Skill">
        {editing && <form onSubmit={handleEdit} className="space-y-4">
          <input required value={editing.employee} onChange={e => setEditing({...editing, employee: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editing.skill} onChange={e => setEditing({...editing, skill: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={editing.level} onChange={e => setEditing({...editing, level: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Expert</option></select>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.certified} onChange={e => setEditing({...editing, certified: e.target.checked})} /> Certified</label>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Save</button>
        </form>}
      </GenericModal>
    </div>
  );
}

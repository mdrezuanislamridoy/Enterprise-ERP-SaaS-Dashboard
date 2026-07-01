import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, X, MoreHorizontal } from 'lucide-react';
import { GenericModal } from '../../components/common/GenericModal';
import { StatusBadge } from '../../components/common/StatusBadge';

export function PayrollPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form, setForm] = useState({ employee: '', period: '', salary: '', deductions: '$0', netPay: '', status: 'Pending' });
  const [editing, setEditing] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetch('/api/payroll').then(r => r.json()).then(d => { setItems(d.items || []); setLoading(false); }).catch(console.error); }, []);

  const handleCreate = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); try { const r = await fetch('/api/payroll', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); const d = await r.json(); if (d.item) { setItems([...items, d.item]); setIsModalOpen(false); } } finally { setSubmitting(false); } };
  const handleEdit = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); try { const r = await fetch(`/api/payroll/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) }); const d = await r.json(); if (d.item) { setItems(items.map(i => i.id === editing.id ? d.item : i)); setIsEditOpen(false); } } finally { setSubmitting(false); } };
  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await fetch(`/api/payroll/${id}`, { method: 'DELETE' }); setItems(items.filter(i => i.id !== id)); };

  if (loading) return <div className="p-6">Loading...</div>;
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><CreditCard /> Payroll</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"><Plus size={16} /> Add Payroll</button>
      </div>
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-b border-border"><tr>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Employee</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Period</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Salary</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Deductions</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Net Pay</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>{items.map(i => (
            <tr key={i.id} className="border-b border-border hover:bg-muted/30">
              <td className="px-5 py-3.5 font-medium">{i.employee}</td>
              <td className="px-5 py-3.5">{i.period}</td>
              <td className="px-5 py-3.5 font-semibold">{i.salary}</td>
              <td className="px-5 py-3.5 text-red-500">{i.deductions}</td>
              <td className="px-5 py-3.5 font-semibold text-emerald-600">{i.netPay}</td>
              <td className="px-5 py-3.5"><StatusBadge status={i.status} /></td>
              <td className="px-5 py-3.5 flex gap-2">
                <button onClick={() => { setEditing(i); setIsEditOpen(true); }}><MoreHorizontal size={14} /></button>
                <button onClick={() => handleDelete(i.id)} className="text-red-500"><X size={14} /></button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Payroll">
        <form onSubmit={handleCreate} className="space-y-4">
          <input required placeholder="Employee" value={form.employee} onChange={e => setForm({...form, employee: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Period (e.g. Jun 2026)" value={form.period} onChange={e => setForm({...form, period: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Salary" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Deductions" value={form.deductions} onChange={e => setForm({...form, deductions: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Net Pay" value={form.netPay} onChange={e => setForm({...form, netPay: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Pending</option><option>Completed</option><option>Processing</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Create</button>
        </form>
      </GenericModal>
      <GenericModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Payroll">
        {editing && <form onSubmit={handleEdit} className="space-y-4">
          <input required value={editing.employee} onChange={e => setEditing({...editing, employee: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editing.period} onChange={e => setEditing({...editing, period: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editing.salary} onChange={e => setEditing({...editing, salary: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editing.deductions} onChange={e => setEditing({...editing, deductions: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editing.netPay} onChange={e => setEditing({...editing, netPay: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={editing.status} onChange={e => setEditing({...editing, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Pending</option><option>Completed</option><option>Processing</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Save</button>
        </form>}
      </GenericModal>
    </div>
  );
}

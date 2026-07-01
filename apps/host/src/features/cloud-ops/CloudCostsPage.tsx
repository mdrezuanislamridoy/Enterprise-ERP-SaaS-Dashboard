import React, { useState, useEffect } from 'react';
import { DollarSign, Plus, X, MoreHorizontal } from 'lucide-react';
import { GenericModal } from '../../components/common/GenericModal';

export function CloudCostsPage() {
  const [billing, setBilling] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ service: '', cost: '', trend: '', status: 'Stable' });
  const [editingItem, setEditingItem] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/billing').then(res => res.json()).then(d => { setBilling(d.billing || []); setLoading(false); }).catch(console.error);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/billing', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newItem) });
      const data = await res.json();
      if (data.billing) { setBilling([...billing, data.billing]); setIsModalOpen(false); }
    } finally { setSubmitting(false); }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/billing/${editingItem.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingItem) });
      const data = await res.json();
      if (data.billing) { setBilling(billing.map(b => b.id === editingItem.id ? data.billing : b)); setIsEditModalOpen(false); }
    } finally { setSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this billing item?")) return;
    await fetch(`/api/billing/${id}`, { method: 'DELETE' });
    setBilling(billing.filter(b => b.id !== id));
  };

  if (loading) return <div className="p-6">Loading Cloud Costs...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><DollarSign /> Cloud Costs</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
          <Plus size={16} /> Track Service
        </button>
      </div>
      
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left border-b border-border">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Service</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Cost/mo</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Trend %</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Status</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Last Updated</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {billing.map(b => (
              <tr key={b.id} className="border-b border-border hover:bg-muted/30">
                <td className="px-5 py-3.5 font-medium">{b.service}</td>
                <td className="px-5 py-3.5">${b.cost.toFixed(2)}</td>
                <td className="px-5 py-3.5">{b.trend > 0 ? `+${b.trend}` : b.trend}%</td>
                <td className="px-5 py-3.5"><span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">{b.status}</span></td>
                <td className="px-5 py-3.5">{b.lastUpdated}</td>
                <td className="px-5 py-3.5 flex gap-2">
                  <button onClick={() => { setEditingItem(b); setIsEditModalOpen(true); }}><MoreHorizontal size={14} /></button>
                  <button onClick={() => handleDelete(b.id)} className="text-red-500"><X size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Track Service Cost">
        <form onSubmit={handleCreate} className="space-y-4">
          <input required placeholder="Service Name (e.g. AWS EC2)" value={newItem.service} onChange={e => setNewItem({...newItem, service: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" step="0.01" placeholder="Cost ($)" value={newItem.cost} onChange={e => setNewItem({...newItem, cost: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" step="0.1" placeholder="Trend %" value={newItem.trend} onChange={e => setNewItem({...newItem, trend: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={newItem.status} onChange={e => setNewItem({...newItem, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Stable</option><option>Increasing</option><option>Optimized</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Track</button>
        </form>
      </GenericModal>

      <GenericModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Cost">
        {editingItem && <form onSubmit={handleEdit} className="space-y-4">
          <input required value={editingItem.service} onChange={e => setEditingItem({...editingItem, service: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" step="0.01" value={editingItem.cost} onChange={e => setEditingItem({...editingItem, cost: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" step="0.1" value={editingItem.trend} onChange={e => setEditingItem({...editingItem, trend: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={editingItem.status} onChange={e => setEditingItem({...editingItem, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Stable</option><option>Increasing</option><option>Optimized</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Save</button>
        </form>}
      </GenericModal>
    </div>
  );
}

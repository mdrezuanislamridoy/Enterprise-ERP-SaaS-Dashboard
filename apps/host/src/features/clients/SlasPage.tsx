import React, { useState, useEffect } from 'react';
import { Activity, Plus, X, MoreHorizontal } from 'lucide-react';
import { GenericModal } from '../../components/common/GenericModal';
import { StatusBadge } from '../../components/common/StatusBadge';

export function SlasPage() {
  const [slas, setSlas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ clientName: '', service: '', uptime: '99.9%', status: 'Active' });
  const [editingItem, setEditingItem] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/slas').then(res => res.json()).then(d => { setSlas(d.slas || []); setLoading(false); }).catch(console.error);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/slas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newItem) });
      const data = await res.json();
      if (data.sla) { setSlas([...slas, data.sla]); setIsModalOpen(false); }
    } finally { setSubmitting(false); }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/slas/${editingItem.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingItem) });
      const data = await res.json();
      if (data.sla) { setSlas(slas.map(s => s.id === editingItem.id ? data.sla : s)); setIsEditModalOpen(false); }
    } finally { setSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this SLA?")) return;
    await fetch(`/api/slas/${id}`, { method: 'DELETE' });
    setSlas(slas.filter(s => s.id !== id));
  };

  if (loading) return <div className="p-6">Loading SLAs...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Activity /> SLA Monitoring</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
          <Plus size={16} /> Track SLA
        </button>
      </div>
      
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left border-b border-border">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">ID</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Client Name</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Service</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Uptime (%)</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Status</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slas.map(s => (
              <tr key={s.id} className="border-b border-border hover:bg-muted/30">
                <td className="px-5 py-3.5 font-mono text-xs">{s.slaId}</td>
                <td className="px-5 py-3.5 font-medium">{s.clientName}</td>
                <td className="px-5 py-3.5">{s.service}</td>
                <td className="px-5 py-3.5 font-medium">{s.uptime}</td>
                <td className="px-5 py-3.5"><StatusBadge status={s.status} /></td>
                <td className="px-5 py-3.5 flex gap-2">
                  <button onClick={() => { setEditingItem(s); setIsEditModalOpen(true); }}><MoreHorizontal size={14} /></button>
                  <button onClick={() => handleDelete(s.id)} className="text-red-500"><X size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Track SLA">
        <form onSubmit={handleCreate} className="space-y-4">
          <input required placeholder="Client Name" value={newItem.clientName} onChange={e => setNewItem({...newItem, clientName: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Service" value={newItem.service} onChange={e => setNewItem({...newItem, service: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Uptime (e.g. 99.9%)" value={newItem.uptime} onChange={e => setNewItem({...newItem, uptime: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={newItem.status} onChange={e => setNewItem({...newItem, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Active</option><option>Critical</option><option>Breached</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Create</button>
        </form>
      </GenericModal>

      <GenericModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit SLA">
        {editingItem && <form onSubmit={handleEdit} className="space-y-4">
          <input required value={editingItem.clientName} onChange={e => setEditingItem({...editingItem, clientName: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editingItem.service} onChange={e => setEditingItem({...editingItem, service: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editingItem.uptime} onChange={e => setEditingItem({...editingItem, uptime: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={editingItem.status} onChange={e => setEditingItem({...editingItem, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Active</option><option>Critical</option><option>Breached</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Save</button>
        </form>}
      </GenericModal>
    </div>
  );
}

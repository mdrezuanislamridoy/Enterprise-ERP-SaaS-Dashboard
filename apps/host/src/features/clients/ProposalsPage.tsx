import React, { useState, useEffect } from 'react';
import { Target, Plus, X, MoreHorizontal } from 'lucide-react';
import { GenericModal } from '../../components/common/GenericModal';
import { StatusBadge } from '../../components/common/StatusBadge';

export function ProposalsPage() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ clientName: '', title: '', value: '', status: 'Pending', date: '' });
  const [editingItem, setEditingItem] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/proposals').then(res => res.json()).then(d => { setProposals(d.proposals || []); setLoading(false); }).catch(console.error);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/proposals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newItem) });
      const data = await res.json();
      if (data.proposal) { setProposals([...proposals, data.proposal]); setIsModalOpen(false); }
    } finally { setSubmitting(false); }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/proposals/${editingItem.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingItem) });
      const data = await res.json();
      if (data.proposal) { setProposals(proposals.map(p => p.id === editingItem.id ? data.proposal : p)); setIsEditModalOpen(false); }
    } finally { setSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this proposal?")) return;
    await fetch(`/api/proposals/${id}`, { method: 'DELETE' });
    setProposals(proposals.filter(p => p.id !== id));
  };

  if (loading) return <div className="p-6">Loading Proposals...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Target /> Proposals</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
          <Plus size={16} /> New Proposal
        </button>
      </div>
      
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left border-b border-border">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">ID</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Client Name</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Title</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Value</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Status</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Date</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map(p => (
              <tr key={p.id} className="border-b border-border hover:bg-muted/30">
                <td className="px-5 py-3.5 font-mono text-xs">{p.proposalId}</td>
                <td className="px-5 py-3.5 font-medium">{p.clientName}</td>
                <td className="px-5 py-3.5">{p.title}</td>
                <td className="px-5 py-3.5">{p.value}</td>
                <td className="px-5 py-3.5"><StatusBadge status={p.status} /></td>
                <td className="px-5 py-3.5 text-xs text-muted-foreground">{p.date}</td>
                <td className="px-5 py-3.5 flex gap-2">
                  <button onClick={() => { setEditingItem(p); setIsEditModalOpen(true); }}><MoreHorizontal size={14} /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-500"><X size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Proposal">
        <form onSubmit={handleCreate} className="space-y-4">
          <input required placeholder="Client Name" value={newItem.clientName} onChange={e => setNewItem({...newItem, clientName: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Proposal Title" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Value (e.g. $5,000)" value={newItem.value} onChange={e => setNewItem({...newItem, value: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={newItem.status} onChange={e => setNewItem({...newItem, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Pending</option><option>Accepted</option><option>Rejected</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Create</button>
        </form>
      </GenericModal>

      <GenericModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Proposal">
        {editingItem && <form onSubmit={handleEdit} className="space-y-4">
          <input required value={editingItem.clientName} onChange={e => setEditingItem({...editingItem, clientName: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editingItem.value} onChange={e => setEditingItem({...editingItem, value: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={editingItem.status} onChange={e => setEditingItem({...editingItem, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Pending</option><option>Accepted</option><option>Rejected</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Save</button>
        </form>}
      </GenericModal>
    </div>
  );
}

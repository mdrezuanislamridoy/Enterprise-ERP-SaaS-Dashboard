import React, { useState, useEffect } from 'react';
import { Database, Plus, X, MoreHorizontal } from 'lucide-react';
import { GenericModal } from '../../components/common/GenericModal';

export function InfrastructurePage() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newNode, setNewNode] = useState({ name: '', region: '', status: 'Healthy', cpuUsage: '', memoryUsage: '', uptime: '99.99%' });
  const [editingNode, setEditingNode] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/nodes').then(res => res.json()).then(d => { setNodes(d.nodes || []); setLoading(false); }).catch(console.error);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/nodes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newNode) });
      const data = await res.json();
      if (data.node) { setNodes([...nodes, data.node]); setIsModalOpen(false); }
    } finally { setSubmitting(false); }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/nodes/${editingNode.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingNode) });
      const data = await res.json();
      if (data.node) { setNodes(nodes.map(n => n.id === editingNode.id ? data.node : n)); setIsEditModalOpen(false); }
    } finally { setSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this node?")) return;
    await fetch(`/api/nodes/${id}`, { method: 'DELETE' });
    setNodes(nodes.filter(n => n.id !== id));
  };

  if (loading) return <div className="p-6">Loading Infrastructure...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Database /> Infrastructure Nodes</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
          <Plus size={16} /> Add Node
        </button>
      </div>
      
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left border-b border-border">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Node ID</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Name</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Region</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">CPU</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Memory</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Uptime</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Status</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map(n => (
              <tr key={n.id} className="border-b border-border hover:bg-muted/30">
                <td className="px-5 py-3.5 font-mono text-xs">{n.nodeId}</td>
                <td className="px-5 py-3.5 font-medium">{n.name}</td>
                <td className="px-5 py-3.5">{n.region}</td>
                <td className="px-5 py-3.5">{n.cpuUsage}%</td>
                <td className="px-5 py-3.5">{n.memoryUsage}%</td>
                <td className="px-5 py-3.5">{n.uptime}</td>
                <td className="px-5 py-3.5"><span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">{n.status}</span></td>
                <td className="px-5 py-3.5 flex gap-2">
                  <button onClick={() => { setEditingNode(n); setIsEditModalOpen(true); }}><MoreHorizontal size={14} /></button>
                  <button onClick={() => handleDelete(n.id)} className="text-red-500"><X size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Node">
        <form onSubmit={handleCreate} className="space-y-4">
          <input required placeholder="Name" value={newNode.name} onChange={e => setNewNode({...newNode, name: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Region" value={newNode.region} onChange={e => setNewNode({...newNode, region: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" placeholder="CPU Usage %" value={newNode.cpuUsage} onChange={e => setNewNode({...newNode, cpuUsage: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" placeholder="Memory Usage %" value={newNode.memoryUsage} onChange={e => setNewNode({...newNode, memoryUsage: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={newNode.status} onChange={e => setNewNode({...newNode, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Healthy</option><option>Degraded</option><option>Offline</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Create</button>
        </form>
      </GenericModal>

      <GenericModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Node">
        {editingNode && <form onSubmit={handleEdit} className="space-y-4">
          <input required value={editingNode.name} onChange={e => setEditingNode({...editingNode, name: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editingNode.region} onChange={e => setEditingNode({...editingNode, region: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" value={editingNode.cpuUsage} onChange={e => setEditingNode({...editingNode, cpuUsage: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" value={editingNode.memoryUsage} onChange={e => setEditingNode({...editingNode, memoryUsage: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={editingNode.status} onChange={e => setEditingNode({...editingNode, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Healthy</option><option>Degraded</option><option>Offline</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Save</button>
        </form>}
      </GenericModal>
    </div>
  );
}

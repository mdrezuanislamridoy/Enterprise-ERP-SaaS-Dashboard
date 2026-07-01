import React, { useState, useEffect } from 'react';
import { Hash, Plus, X, MoreHorizontal } from 'lucide-react';
import { GenericModal } from '../../components/common/GenericModal';

export function ApiUsagePage() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newMetric, setNewMetric] = useState({ endpoint: '', requests: '', latency: '', errorRate: '', status: 'Normal' });
  const [editingMetric, setEditingMetric] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/api-metrics').then(res => res.json()).then(d => { setMetrics(d.metrics || []); setLoading(false); }).catch(console.error);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/api-metrics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newMetric) });
      const data = await res.json();
      if (data.metric) { setMetrics([...metrics, data.metric]); setIsModalOpen(false); }
    } finally { setSubmitting(false); }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/api-metrics/${editingMetric.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingMetric) });
      const data = await res.json();
      if (data.metric) { setMetrics(metrics.map(m => m.id === editingMetric.id ? data.metric : m)); setIsEditModalOpen(false); }
    } finally { setSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this metric?")) return;
    await fetch(`/api/api-metrics/${id}`, { method: 'DELETE' });
    setMetrics(metrics.filter(m => m.id !== id));
  };

  if (loading) return <div className="p-6">Loading API Usage...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Hash /> API Usage</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
          <Plus size={16} /> Track Endpoint
        </button>
      </div>
      
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left border-b border-border">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Endpoint</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Requests/min</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Latency (ms)</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Error Rate %</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Status</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map(m => (
              <tr key={m.id} className="border-b border-border hover:bg-muted/30">
                <td className="px-5 py-3.5 font-medium font-mono text-xs">{m.endpoint}</td>
                <td className="px-5 py-3.5">{m.requests}</td>
                <td className="px-5 py-3.5">{m.latency}</td>
                <td className="px-5 py-3.5">{m.errorRate}%</td>
                <td className="px-5 py-3.5"><span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">{m.status}</span></td>
                <td className="px-5 py-3.5 flex gap-2">
                  <button onClick={() => { setEditingMetric(m); setIsEditModalOpen(true); }}><MoreHorizontal size={14} /></button>
                  <button onClick={() => handleDelete(m.id)} className="text-red-500"><X size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Track Endpoint">
        <form onSubmit={handleCreate} className="space-y-4">
          <input required placeholder="Endpoint Path (/api/...)" value={newMetric.endpoint} onChange={e => setNewMetric({...newMetric, endpoint: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" placeholder="Requests / min" value={newMetric.requests} onChange={e => setNewMetric({...newMetric, requests: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" placeholder="Latency (ms)" value={newMetric.latency} onChange={e => setNewMetric({...newMetric, latency: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" step="0.01" placeholder="Error Rate %" value={newMetric.errorRate} onChange={e => setNewMetric({...newMetric, errorRate: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={newMetric.status} onChange={e => setNewMetric({...newMetric, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Normal</option><option>Degraded</option><option>Offline</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Track</button>
        </form>
      </GenericModal>

      <GenericModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Metric">
        {editingMetric && <form onSubmit={handleEdit} className="space-y-4">
          <input required value={editingMetric.endpoint} onChange={e => setEditingMetric({...editingMetric, endpoint: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" value={editingMetric.requests} onChange={e => setEditingMetric({...editingMetric, requests: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" value={editingMetric.latency} onChange={e => setEditingMetric({...editingMetric, latency: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required type="number" step="0.01" value={editingMetric.errorRate} onChange={e => setEditingMetric({...editingMetric, errorRate: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={editingMetric.status} onChange={e => setEditingMetric({...editingMetric, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Normal</option><option>Degraded</option><option>Offline</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Save</button>
        </form>}
      </GenericModal>
    </div>
  );
}

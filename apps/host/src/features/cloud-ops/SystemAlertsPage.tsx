import React, { useState, useEffect } from 'react';
import { AlertCircle, Plus, X, MoreHorizontal } from 'lucide-react';
import { GenericModal } from '../../components/common/GenericModal';

export function SystemAlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({ service: '', metric: '', threshold: '', status: 'Warning' });
  const [editingAlert, setEditingAlert] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/alerts').then(res => res.json()).then(d => { setAlerts(d.alerts || []); setLoading(false); }).catch(console.error);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/alerts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newAlert) });
      const data = await res.json();
      if (data.alert) {
        setAlerts([...alerts, data.alert]);
        setIsModalOpen(false);
      }
    } finally { setSubmitting(false); }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/alerts/${editingAlert.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingAlert) });
      const data = await res.json();
      if (data.alert) {
        setAlerts(alerts.map(a => a.id === editingAlert.id ? data.alert : a));
        setIsEditModalOpen(false);
      }
    } finally { setSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this alert?")) return;
    await fetch(`/api/alerts/${id}`, { method: 'DELETE' });
    setAlerts(alerts.filter(a => a.id !== id));
  };

  if (loading) return <div className="p-6">Loading System Alerts...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><AlertCircle /> System Alerts</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
          <Plus size={16} /> New Alert
        </button>
      </div>
      
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left border-b border-border">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">ID</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Service</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Metric</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Threshold</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Status</th>
              <th className="px-5 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map(a => (
              <tr key={a.id} className="border-b border-border hover:bg-muted/30">
                <td className="px-5 py-3.5 font-mono text-xs">{a.alertId}</td>
                <td className="px-5 py-3.5 font-medium">{a.service}</td>
                <td className="px-5 py-3.5">{a.metric}</td>
                <td className="px-5 py-3.5">{a.threshold}</td>
                <td className="px-5 py-3.5"><span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">{a.status}</span></td>
                <td className="px-5 py-3.5 flex gap-2">
                  <button onClick={() => { setEditingAlert(a); setIsEditModalOpen(true); }}><MoreHorizontal size={14} /></button>
                  <button onClick={() => handleDelete(a.id)} className="text-red-500"><X size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Alert">
        <form onSubmit={handleCreate} className="space-y-4">
          <input required placeholder="Service" value={newAlert.service} onChange={e => setNewAlert({...newAlert, service: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Metric" value={newAlert.metric} onChange={e => setNewAlert({...newAlert, metric: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required placeholder="Threshold" value={newAlert.threshold} onChange={e => setNewAlert({...newAlert, threshold: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={newAlert.status} onChange={e => setNewAlert({...newAlert, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Warning</option><option>Critical</option><option>Resolved</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Create</button>
        </form>
      </GenericModal>

      <GenericModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Alert">
        {editingAlert && <form onSubmit={handleEdit} className="space-y-4">
          <input required value={editingAlert.service} onChange={e => setEditingAlert({...editingAlert, service: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editingAlert.metric} onChange={e => setEditingAlert({...editingAlert, metric: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <input required value={editingAlert.threshold} onChange={e => setEditingAlert({...editingAlert, threshold: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <select value={editingAlert.status} onChange={e => setEditingAlert({...editingAlert, status: e.target.value})} className="w-full border rounded p-2 text-sm"><option>Warning</option><option>Critical</option><option>Resolved</option></select>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-white p-2 rounded">Save</button>
        </form>}
      </GenericModal>
    </div>
  );
}

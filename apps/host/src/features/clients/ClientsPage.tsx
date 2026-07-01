import React, { useState } from "react";
import {
  LayoutDashboard, Users, ShoppingCart, Package, DollarSign, TrendingUp, Bell, Search, Menu, X, ChevronDown, ChevronRight, LogOut, Moon, Sun, FileText, Activity, ArrowUpRight, ArrowDownRight, Plus, Download, MoreHorizontal, CheckCircle2, AlertCircle, Clock, Star, Zap, Shield, Building2, CreditCard, RefreshCw, Warehouse, BookOpen, Receipt, UserCheck, GraduationCap, Award, Kanban, Timer, Ticket, MessageSquare, Cpu, Wrench, Folder, Brain, UserCog, Key, Sliders, Mail, Plug, Paintbrush, ShieldCheck, BarChart2, PieChart, Target, TrendingDown, Inbox, Users2, Store, Boxes, MapPin, QrCode, ArrowLeftRight, Landmark, Banknote, Scale, Headphones, FileLock, PlugZap, Tag, CheckSquare, ChevronUp, MoreVertical, Circle, Layers, CalendarDays, GitBranch, AlignLeft, Eye, FolderKanban, ReceiptText, Truck, Globe, Hash, Database, BadgePercent, ClipboardList, BookMarked, HeartHandshake, Gauge, UserPlus, Newspaper, Settings, Filter, ChevronLeft, Home
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend } from "recharts";

import { StatusBadge } from "../../components/common/StatusBadge";
import { KpiCard } from "../../components/common/KpiCard";
import { ChartTooltip } from "../../components/common/ChartTooltip";
import { cn } from "../../lib/utils";

import { GenericModal } from "../../components/common/GenericModal";

// ─── Clients Page ───────────────────────────────────────────────────────────

export function ClientsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: "", email: "", plan: "Basic", mrr: "$1,000", stack: "React, Node.js", status: "Active", joined: "Mar 2026" });
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    fetch('/api/clients')
      .then(res => res.json())
      .then(d => {
        setClients(d.clients || []);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const [editingClient, setEditingClient] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient)
      });
      const data = await res.json();
      if (data.client) {
        setClients(prev => [...prev, data.client]);
        setIsModalOpen(false);
        setNewClient({ name: "", email: "", plan: "Basic", mrr: "$1,000", stack: "React, Node.js", status: "Active", joined: "Mar 2026" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/clients/${editingClient.clientId || editingClient.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingClient)
      });
      const data = await res.json();
      if (data.client) {
        setClients(prev => prev.map(c => (c.clientId === data.client.clientId || c.id === data.client.id) ? data.client : c));
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      setClients(prev => prev.filter(c => c.clientId !== id && c.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl mx-auto">
      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Client">
        <form onSubmit={handleAddClient} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Company Name</label>
            <input required type="text" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Acme Corp" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Contact Email</label>
            <input required type="email" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="contact@acme.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Plan</label>
              <select value={newClient.plan} onChange={e => setNewClient({...newClient, plan: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">MRR</label>
              <input required type="text" value={newClient.mrr} onChange={e => setNewClient({...newClient, mrr: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="$5,000" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Status</label>
              <select value={newClient.status} onChange={e => setNewClient({...newClient, status: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Active">Active</option>
                <option value="Churned">Churned</option>
                <option value="At Risk">At Risk</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Joined Date</label>
              <input type="text" value={newClient.joined} onChange={e => setNewClient({...newClient, joined: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Mar 2026" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Tech Stack</label>
            <input required type="text" value={newClient.stack} onChange={e => setNewClient({...newClient, stack: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="React, Node.js, AWS" />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-foreground bg-muted hover:bg-muted/80 rounded-md transition-colors">Cancel</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 text-sm text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors disabled:opacity-50">
              {submitting ? 'Saving...' : 'Add Client'}
            </button>
          </div>
        </form>
        </GenericModal>
      <GenericModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Client">
        {editingClient && (
        <form onSubmit={handleEditClient} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Company Name</label>
            <input required type="text" value={editingClient.name} onChange={e => setEditingClient({...editingClient, name: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Contact Email</label>
            <input required type="email" value={editingClient.email} onChange={e => setEditingClient({...editingClient, email: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Plan</label>
              <select value={editingClient.plan} onChange={e => setEditingClient({...editingClient, plan: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">MRR</label>
              <input required type="text" value={editingClient.mrr} onChange={e => setEditingClient({...editingClient, mrr: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Status</label>
              <select value={editingClient.status} onChange={e => setEditingClient({...editingClient, status: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Active">Active</option>
                <option value="Churned">Churned</option>
                <option value="At Risk">At Risk</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Joined Date</label>
              <input type="text" value={editingClient.joined} onChange={e => setEditingClient({...editingClient, joined: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Tech Stack</label>
            <input required type="text" value={editingClient.stack} onChange={e => setEditingClient({...editingClient, stack: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm text-foreground bg-muted hover:bg-muted/80 rounded-md transition-colors">Cancel</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 text-sm text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors disabled:opacity-50">
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
        )}
      </GenericModal>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Clients</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} total clients
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm border border-border text-muted-foreground rounded-lg px-3 py-2 hover:bg-muted transition-colors">
            <Download size={14} />
            Export
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 text-sm bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors font-medium">
            <Plus size={14} />
            Add Client
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <div className="relative flex-1 max-w-xs">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-muted rounded-lg outline-none text-foreground placeholder:text-muted-foreground focus:ring-2 ring-primary/30"
            />
          </div>
          <button className="flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-lg px-3 py-2 hover:bg-muted transition-colors">
            <Filter size={14} />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {[
                  "ID",
                  "Name",
                  "Contact",
                  "SLA Plan",
                  "MRR",
                  "Tech Stack",
                  "Status",
                  "Joined",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr
                  key={i}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors group"
                >
                  <td className="px-5 py-3.5 text-xs font-mono text-muted-foreground">
                    {c.id}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-sm text-foreground whitespace-nowrap">
                    {c.name}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    {c.email}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        c.plan.includes("Enterprise")
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400"
                          : c.plan.includes("Standard")
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                            : "bg-muted text-muted-foreground",
                      )}
                    >
                      {c.plan}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-foreground">
                    {c.mrr}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    {c.stack}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground whitespace-nowrap">
                    {c.joined}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <Eye size={13} />
                      </button>
                      <button onClick={() => { setEditingClient(c); setIsEditModalOpen(true); }} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <MoreHorizontal size={13} />
                      </button>
                      <button onClick={() => handleDeleteClient(c.clientId || c.id)} className="p-1.5 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors">
                        <X size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-3.5 border-t border-border">
          <span className="text-xs text-muted-foreground">
            Showing {filtered.length} of {clients.length} clients
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-1.5 rounded hover:bg-muted text-muted-foreground disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={15} />
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={cn(
                  "w-7 h-7 rounded text-xs font-medium transition-colors",
                  page === n
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground",
                )}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => p + 1)}
              className="p-1.5 rounded hover:bg-muted text-muted-foreground transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

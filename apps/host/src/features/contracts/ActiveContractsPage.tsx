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

// ─── Active Contracts Page ───────────────────────────────────────────────────────────

export function ActiveContractsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const statuses = [
    "all",
    "active",
    "processing",
    "pending",
    "completed",
    "cancelled",
  ];
  const [activeContracts, setActiveContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContract, setNewContract] = useState({ clientName: "", service: "", value: "$10,000", status: "Active", deadline: "" });
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    fetch('/api/contracts')
      .then(res => res.json())
      .then(d => {
        setActiveContracts(d.activeContracts || []);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const [editingContract, setEditingContract] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddContract = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContract)
      });
      const data = await res.json();
      if (data.contract) {
        setActiveContracts(prev => [...prev, data.contract]);
        setIsModalOpen(false);
        setNewContract({ clientName: "", service: "", value: "$10,000", status: "Active", deadline: "" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditContract = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/contracts/${editingContract.contractId || editingContract.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingContract)
      });
      const data = await res.json();
      if (data.contract) {
        setActiveContracts(prev => prev.map(c => (c.contractId === data.contract.contractId || c.id === data.contract.id) ? data.contract : c));
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteContract = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contract?")) return;
    try {
      await fetch(`/api/contracts/${id}`, { method: 'DELETE' });
      setActiveContracts(prev => prev.filter(c => c.contractId !== id && c.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = activeContracts.filter((o) => {
    const matchS =
      o.client.toLowerCase().includes(search.toLowerCase()) ||
      o.service.toLowerCase().includes(search.toLowerCase());
    const matchF = statusFilter === "all" || o.status.toLowerCase() === statusFilter.toLowerCase();
    return matchS && matchF;
  });

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl mx-auto">
      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Contract">
        <form onSubmit={handleAddContract} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Client Name</label>
            <input required type="text" value={newContract.clientName} onChange={e => setNewContract({...newContract, clientName: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="E.g. BlueSky Systems" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Service</label>
            <input required type="text" value={newContract.service} onChange={e => setNewContract({...newContract, service: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="E.g. Cloud Migration" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Value</label>
              <input required type="text" value={newContract.value} onChange={e => setNewContract({...newContract, value: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="$10,000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Status</label>
              <select value={newContract.status} onChange={e => setNewContract({...newContract, status: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Deadline</label>
            <input required type="text" value={newContract.deadline} onChange={e => setNewContract({...newContract, deadline: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Q4 2026" />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-foreground bg-muted hover:bg-muted/80 rounded-md transition-colors">Cancel</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 text-sm text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors disabled:opacity-50">
              {submitting ? 'Creating...' : 'Create Contract'}
            </button>
          </div>
        </form>
        </GenericModal>
      <GenericModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Contract">
        {editingContract && (
        <form onSubmit={handleEditContract} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Client Name</label>
            <input required type="text" value={editingContract.clientName || editingContract.client} onChange={e => setEditingContract({...editingContract, clientName: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Service Type</label>
            <input required type="text" value={editingContract.service} onChange={e => setEditingContract({...editingContract, service: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Contract Value</label>
              <input required type="text" value={editingContract.value} onChange={e => setEditingContract({...editingContract, value: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Status</label>
              <select value={editingContract.status} onChange={e => setEditingContract({...editingContract, status: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Deadline</label>
            <input required type="text" value={editingContract.deadline} onChange={e => setEditingContract({...editingContract, deadline: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
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
          <h1 className="text-xl font-semibold text-foreground">
            Active Contracts
          </h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} total contracts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm border border-border text-muted-foreground rounded-lg px-3 py-2 hover:bg-muted transition-colors">
            <Download size={14} />
            Export
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 text-sm bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 font-medium transition-colors">
            <Plus size={14} />
            New Contract
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-3 px-5 py-4 border-b border-border items-center justify-between">
          <div className="relative flex-1 w-full max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contracts..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-muted rounded-lg outline-none text-foreground placeholder:text-muted-foreground focus:ring-2 ring-primary/30"
            />
          </div>
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-md capitalize transition-colors",
                  statusFilter === s
                    ? "bg-card text-foreground shadow-sm font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {[
                  "Contract ID",
                  "Client",
                  "Service",
                  "Value",
                  "Deadline",
                  "Status",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => (
                <tr
                  key={i}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors group"
                >
                  <td className="px-5 py-3.5 text-xs font-mono font-medium text-primary">
                    {o.id}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-medium text-foreground">
                    {o.client}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    {o.service}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-foreground">
                    {o.value}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    {o.deadline}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
                        <Eye size={13} />
                      </button>
                      <button onClick={() => { setEditingContract(o); setIsEditModalOpen(true); }} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <MoreHorizontal size={13} />
                      </button>
                      <button onClick={() => handleDeleteContract(o.contractId || o.id)} className="p-1.5 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors">
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
            Showing {filtered.length} results
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, "..."].map((n, i) => (
              <button
                key={i}
                className={cn(
                  "w-7 h-7 rounded text-xs font-medium transition-colors",
                  n === 1
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground",
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

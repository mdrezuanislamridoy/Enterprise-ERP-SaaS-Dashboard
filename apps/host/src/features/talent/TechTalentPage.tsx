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

// ─── Tech Talent Page ────────────────────────────────────────────────────────────

export function TechTalentPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTalent, setNewTalent] = useState({ name: "", role: "", utilization: "80", performance: "90", risk: "Low", dept: "", email: "", salary: "", status: "active", joined: "" });
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    fetch('/api/talent')
      .then(res => res.json())
      .then(d => {
        setEmployees(d.employees || []);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const [editingTalent, setEditingTalent] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddTalent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/talent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTalent)
      });
      const data = await res.json();
      if (data.employee) {
        setEmployees(prev => [...prev, data.employee]);
        setIsModalOpen(false);
        setNewTalent({ name: "", role: "", utilization: "", performance: "", risk: "Low", dept: "", email: "", salary: "", status: "active", joined: "" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditTalent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/talent/${editingTalent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTalent)
      });
      const data = await res.json();
      if (data.employee) {
        setEmployees(prev => prev.map(emp => emp.id === data.employee.id ? data.employee : emp));
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTalent = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await fetch(`/api/talent/${id}`, { method: 'DELETE' });
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = employees.filter(
    (e) =>
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      (e.role || "").toLowerCase().includes(search.toLowerCase()),
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
      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Talent">
        <form onSubmit={handleAddTalent} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
            <input required type="text" value={newTalent.name} onChange={e => setNewTalent({...newTalent, name: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="E.g. Sarah Chen" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Role / Dept</label>
            <input required type="text" value={newTalent.role} onChange={e => setNewTalent({...newTalent, role: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="E.g. Senior Frontend Engineer" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Utilization (%)</label>
              <input required type="number" min="0" max="100" value={newTalent.utilization} onChange={e => setNewTalent({...newTalent, utilization: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="80" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Performance (%)</label>
              <input required type="number" min="0" max="100" value={newTalent.performance} onChange={e => setNewTalent({...newTalent, performance: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="90" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Burnout Risk</label>
            <select value={newTalent.risk} onChange={e => setNewTalent({...newTalent, risk: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-foreground bg-muted hover:bg-muted/80 rounded-md transition-colors">Cancel</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 text-sm text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors disabled:opacity-50">
              {submitting ? 'Adding...' : 'Add Talent'}
            </button>
          </div>
        </form>
      </GenericModal>
      <GenericModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Talent">
        {editingTalent && (
        <form onSubmit={handleEditTalent} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
            <input required type="text" value={editingTalent.name} onChange={e => setEditingTalent({...editingTalent, name: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Role / Dept</label>
            <input required type="text" value={editingTalent.role} onChange={e => setEditingTalent({...editingTalent, role: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Utilization (%)</label>
              <input required type="number" min="0" max="100" value={editingTalent.utilization} onChange={e => setEditingTalent({...editingTalent, utilization: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Performance (%)</label>
              <input required type="number" min="0" max="100" value={editingTalent.performance} onChange={e => setEditingTalent({...editingTalent, performance: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Burnout Risk</label>
              <select value={editingTalent.risk || editingTalent.burnoutRisk} onChange={e => setEditingTalent({...editingTalent, risk: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Department</label>
              <input type="text" value={editingTalent.dept} onChange={e => setEditingTalent({...editingTalent, dept: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Salary</label>
              <input type="text" value={editingTalent.salary} onChange={e => setEditingTalent({...editingTalent, salary: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Joined Date</label>
              <input type="text" value={editingTalent.joined} onChange={e => setEditingTalent({...editingTalent, joined: e.target.value})} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
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
          <h1 className="text-xl font-semibold text-foreground">Tech Talent</h1>
          <p className="text-sm text-muted-foreground">
            {employees.length} total engineers and tech staff
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm border border-border text-muted-foreground rounded-lg px-3 py-2 hover:bg-muted transition-colors">
            <Download size={14} />
            Export
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 text-sm bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 font-medium transition-colors">
            <Plus size={14} />
            Add Talent
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Headcount", value: employees.length.toString(), sub: "Total tech staff" },
          { label: "Engineering", value: employees.filter((e: any) => e.role?.toLowerCase().includes("engineer") || e.role?.toLowerCase().includes("dev")).length.toString(), sub: `${employees.length ? Math.round((employees.filter((e: any) => e.role?.toLowerCase().includes("engineer") || e.role?.toLowerCase().includes("dev")).length / employees.length) * 100) : 0}% of staff` },
          { label: "Open Reqs", value: "8", sub: "Hiring for AI roles" },
          { label: "Skill Clusters", value: new Set(employees.map(e => e.role)).size.toString(), sub: "Unique roles across org" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-card border border-border rounded-xl p-4 shadow-sm"
          >
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="text-xl font-semibold text-foreground mt-1">
              {s.value}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
          </div>
        ))}
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
              placeholder="Search talent..."
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
                  "Talent",
                  "Role",
                  "Department",
                  "Email",
                  "Salary",
                  "Status",
                  "Joined",
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
              {filtered.map((e, i) => (
                <tr
                  key={i}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors group"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                        {e.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {e.name}
                        </div>
                        <div className="text-xs font-mono text-muted-foreground">
                          {e.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    {e.role}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">
                      {e.dept}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    {e.email}
                  </td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-foreground">
                    {e.salary}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={e.status} />
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    {e.joined}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
                        <Eye size={13} />
                      </button>
                      <button onClick={() => { setEditingTalent(e); setIsEditModalOpen(true); }} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
                        <MoreHorizontal size={13} />
                      </button>
                      <button onClick={() => handleDeleteTalent(e.id)} className="p-1.5 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors">
                        <X size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

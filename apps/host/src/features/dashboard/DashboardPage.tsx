import React, { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, ShoppingCart, Package, DollarSign, TrendingUp, Bell, Search, Menu, X, ChevronDown, ChevronRight, LogOut, Moon, Sun, FileText, Activity, ArrowUpRight, ArrowDownRight, Plus, Download, MoreHorizontal, CheckCircle2, AlertCircle, Clock, Star, Zap, Shield, Building2, CreditCard, RefreshCw, Warehouse, BookOpen, Receipt, UserCheck, GraduationCap, Award, Kanban, Timer, Ticket, MessageSquare, Cpu, Wrench, Folder, Brain, UserCog, Key, Sliders, Mail, Plug, Paintbrush, ShieldCheck, BarChart2, PieChart, Target, TrendingDown, Inbox, Users2, Store, Boxes, MapPin, QrCode, ArrowLeftRight, Landmark, Banknote, Scale, Headphones, FileLock, PlugZap, Tag, CheckSquare, ChevronUp, MoreVertical, Circle, Layers, CalendarDays, GitBranch, AlignLeft, Eye, FolderKanban, ReceiptText, Truck, Globe, Hash, Database, BadgePercent, ClipboardList, BookMarked, HeartHandshake, Gauge, UserPlus, Newspaper, Settings, Filter, ChevronLeft, Home
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend } from "recharts";
import { StatusBadge } from "../../components/common/StatusBadge";
import { KpiCard } from "../../components/common/KpiCard";
import { ChartTooltip } from "../../components/common/ChartTooltip";
import { cn } from "../../lib/utils";

const CHART_COLORS = ["#4F46E5", "#2563EB", "#22C55E", "#F59E0B"];

const iconMap: any = {
  DollarSign, TrendingUp, Globe, Database, FileText, Users, Activity, Cpu, CheckCircle2, GitBranch, UserPlus, ShieldCheck, AlertCircle, CheckSquare
};

export function DashboardPage() {
  const [activeChart, setActiveChart] = useState<"revenue" | "costs">("revenue");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(d => {
        // Map string icons to components
        d.kpis = d.kpis.map((k: any) => ({ ...k, icon: iconMap[k.icon] || Activity }));
        d.activities = d.activities.map((a: any) => ({ ...a, icon: iconMap[a.icon] || Activity }));
        setData(d);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading || !data) {
    return (
      <div className="flex h-full w-full items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const { mrrData, revenueByCategoryData, clientGrowthData, kpis, activeContracts, topServices, systemAlerts, activities } = data;

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Good morning, Alex 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Monday, June 30, 2026 — Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-lg px-3 py-2 hover:bg-muted transition-colors">
            <Filter size={14} />
            Filter
          </button>
          <button className="flex items-center gap-2 text-sm bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors font-medium">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <Brain size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">
            NexusAI Summary
          </div>
          <div className="text-sm text-white/80 mt-0.5">
            MRR is up 12.5% this month. 3 high-value enterprise contracts are
            close to closing. AWS US-East CPU is running hot — consider scaling
            instances.
          </div>
        </div>
        <button className="text-white/70 hover:text-white transition-colors flex-shrink-0">
          <X size={16} />
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi: any) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-foreground">
                Revenue & Profit
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Full year 2026
              </p>
            </div>
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              {(["revenue", "costs"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveChart(t)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-md font-medium capitalize transition-colors",
                    activeChart === t
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={mrrData}
              margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-border"
                opacity={0.5}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-muted-foreground"
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v / 1000}K`}
              />
              <Tooltip content={<ChartTooltip />} />
              {activeChart === "revenue" ? (
                <>
                  <Area
                    type="monotone"
                    dataKey="mrr"
                    name="MRR"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    fill="url(#gradRevenue)"
                  />
                  <Area
                    type="monotone"
                    dataKey="costs"
                    name="Operating Costs"
                    stroke="#22C55E"
                    strokeWidth={2}
                    fill="url(#gradProfit)"
                  />
                </>
              ) : (
                <Area
                  type="monotone"
                  dataKey="aws"
                  name="Cloud Infrastructure"
                  stroke="#EF4444"
                  strokeWidth={2}
                  fill="url(#gradExpenses)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-1">
            Revenue by Service
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Q2 2026</p>
          <ResponsiveContainer width="100%" height={160}>
            <RePieChart>
              <Pie
                data={revenueByCategoryData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {revenueByCategoryData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => [`${v}%`, ""]} />
            </RePieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {revenueByCategoryData.map((d: any, i: number) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ background: CHART_COLORS[i] }}
                />
                <span className="text-xs text-muted-foreground truncate">
                  {d.name}
                </span>
                <span className="text-xs font-medium text-foreground ml-auto">
                  {d.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Growth + Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-1">Client Growth</h3>
          <p className="text-xs text-muted-foreground mb-4">
            H1 2026 — New vs. Churned
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={clientGrowthData}
              margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
              barGap={4}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-border"
                opacity={0.5}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11 }}
                className="text-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                className="text-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip prefix="" />} />
              <Bar
                dataKey="new"
                name="New"
                fill="#4F46E5"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="churned"
                name="Churned"
                fill="#EF4444"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Feed */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
            <button className="text-xs text-primary hover:underline">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {activities.map((a: any, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5",
                  )}
                >
                  <a.icon size={13} className={a.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground">
                    <span className="font-medium">{a.user}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    <span className="font-medium text-primary">{a.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {a.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Contracts */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Active Contracts</h3>
            <button className="text-xs text-primary hover:underline">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Contract
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Client
                  </th>
                  <th className="hidden md:table-cell text-left px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Service
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Value
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeContracts.map((o: any, i: number) => (
                  <tr
                    key={i}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-5 py-3 text-xs font-mono text-primary font-medium">
                      {o.id}
                    </td>
                    <td className="px-5 py-3 text-xs font-medium text-foreground">
                      {o.client}
                    </td>
                    <td className="hidden md:table-cell px-5 py-3 text-xs text-muted-foreground">
                      {o.service}
                    </td>
                    <td className="px-5 py-3 text-xs font-semibold text-foreground">
                      {o.value}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Top Services + System Alerts */}
        <div className="space-y-4">
          {/* Top Services */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Top Services</h3>
            </div>
            <div className="divide-y divide-border">
              {topServices.slice(0, 4).map((p: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-foreground truncate">
                      {p.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {p.revenue}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "text-xs font-medium",
                      p.trend > 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-500",
                    )}
                  >
                    {p.trend > 0 ? "+" : ""}
                    {p.trend}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-foreground">System Alerts</h3>
              <AlertCircle size={15} className="text-amber-500" />
            </div>
            <div className="divide-y divide-border">
              {systemAlerts.map((a: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-foreground truncate">
                      {a.service}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {a.id}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={cn(
                        "text-xs font-semibold",
                        a.status === "critical"
                          ? "text-red-500"
                          : "text-amber-500",
                      )}
                    >
                      {a.metric}
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

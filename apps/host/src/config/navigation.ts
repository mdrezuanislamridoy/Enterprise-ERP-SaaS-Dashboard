import {
  LayoutDashboard, Users, ShoppingCart, Package, DollarSign, TrendingUp, Bell, Search, Menu, X, ChevronDown, ChevronRight, LogOut, Moon, Sun, FileText, Activity, ArrowUpRight, ArrowDownRight, Plus, Download, MoreHorizontal, CheckCircle2, AlertCircle, Clock, Star, Zap, Shield, Building2, CreditCard, RefreshCw, Warehouse, BookOpen, Receipt, UserCheck, GraduationCap, Award, Kanban, Timer, Ticket, MessageSquare, Cpu, Wrench, Folder, Brain, UserCog, Key, Sliders, Mail, Plug, Paintbrush, ShieldCheck, BarChart2, PieChart, Target, TrendingDown, Inbox, Users2, Store, Boxes, MapPin, QrCode, ArrowLeftRight, Landmark, Banknote, Scale, Headphones, FileLock, PlugZap, Tag, CheckSquare, ChevronUp, MoreVertical, Circle, Layers, CalendarDays, GitBranch, AlignLeft, Eye, FolderKanban, ReceiptText, Truck, Globe, Hash, Database, BadgePercent, ClipboardList, BookMarked, HeartHandshake, Gauge, UserPlus, Newspaper, Settings, Filter, ChevronLeft, Home
} from "lucide-react";


// ─── Nav Config ──────────────────────────────────────────────────────────────

export const navGroups = [
  {
    items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Client Services",
    items: [
      { id: "active-contracts", label: "Active Contracts", icon: FileText },
      { id: "clients", label: "Clients", icon: Users },
      { id: "proposals", label: "Proposals", icon: Target },
      { id: "slas", label: "SLA Monitoring", icon: Activity },
    ],
  },

  {
    label: "AI Employee Mgmt",
    items: [
      { id: "tech-talent", label: "Tech Talent", icon: Cpu },
      { id: "skill-matrix", label: "Skill Matrix", icon: Layers },
      { id: "performance", label: "Performance", icon: Award },
      { id: "burnout-risk", label: "Burnout Risk AI", icon: Brain },
      { id: "allocation", label: "Project Allocation", icon: CalendarDays },
    ],
  },
  {
    label: "Cloud Ops",
    items: [
      { id: "infrastructure", label: "Infrastructure", icon: Database },
      { id: "system-alerts", label: "System Alerts", icon: AlertCircle },
      { id: "api-usage", label: "API Usage", icon: Hash },
      { id: "cloud-costs", label: "Cloud Costs", icon: DollarSign },
    ],
  },
  {
    label: "Finance",
    items: [
      { id: "mrr", label: "MRR Analysis", icon: TrendingUp },
      { id: "invoices", label: "Invoices", icon: ReceiptText },
      { id: "payroll", label: "Payroll", icon: CreditCard },
      { id: "software-licenses", label: "Software Licenses", icon: Key },
    ],
  },
  {
    label: "Reports",
    items: [
      { id: "delivery-reports", label: "Delivery Reports", icon: BarChart2 },
      { id: "margin-analysis", label: "Margin Analysis", icon: PieChart },
      { id: "ai-insights", label: "AI Insights", icon: Brain },
    ],
  },
];

export const pageLabels: Record<string, string> = {
  dashboard: "Dashboard",
  clients: "Clients",
  "active-contracts": "Active Contracts",
  proposals: "Proposals",
  slas: "SLA Monitoring",
  "tech-talent": "Tech Talent",
  "ai-insights": "AI Insights",
  analytics: "Analytics Module",
  "system-alerts": "System Alerts",
  infrastructure: "Infrastructure",
  "api-usage": "API Usage",
  "cloud-costs": "Cloud Costs",
};

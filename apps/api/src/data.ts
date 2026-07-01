export const mrrData = [
  { month: "Jan", mrr: 182000, costs: 64000, aws: 118000 },
  { month: "Feb", mrr: 195000, costs: 71000, aws: 124000 },
  { month: "Mar", mrr: 221000, costs: 82000, aws: 139000 },
  { month: "Apr", mrr: 208000, costs: 74000, aws: 134000 },
  { month: "May", mrr: 248000, costs: 93000, aws: 155000 },
  { month: "Jun", mrr: 267000, costs: 101000, aws: 166000 },
  { month: "Jul", mrr: 251000, costs: 95000, aws: 156000 },
  { month: "Aug", mrr: 278000, costs: 108000, aws: 170000 },
  { month: "Sep", mrr: 294000, costs: 115000, aws: 179000 },
  { month: "Oct", mrr: 312000, costs: 124000, aws: 188000 },
  { month: "Nov", mrr: 289000, costs: 110000, aws: 179000 },
  { month: "Dec", mrr: 338000, costs: 136000, aws: 202000 },
];

export const revenueByCategoryData = [
  { name: "Web App Dev", value: 42 },
  { name: "AI Integration", value: 28 },
  { name: "Managed Cloud", value: 18 },
  { name: "SaaS Licensing", value: 12 },
];

export const clientGrowthData = [
  { month: "Jan", new: 42, churned: 3, net: 39 },
  { month: "Feb", new: 48, churned: 2, net: 46 },
  { month: "Mar", new: 54, churned: 4, net: 50 },
  { month: "Apr", new: 47, churned: 5, net: 42 },
  { month: "May", new: 61, churned: 1, net: 60 },
  { month: "Jun", new: 68, churned: 3, net: 65 },
];

export const CHART_COLORS = ["#4F46E5", "#2563EB", "#22C55E", "#F59E0B"];

export const kpis = [
  {
    label: "MRR",
    value: "$2.4M",
    change: 12.5,
    icon: "DollarSign",
    colorClass: "bg-indigo-50 text-indigo-600",
    darkColorClass: "bg-indigo-950/40 text-indigo-400",
    border: "border-l-indigo-500",
  },
  {
    label: "Net Margin",
    value: "32.4%",
    change: 8.2,
    icon: "TrendingUp",
    colorClass: "bg-emerald-50 text-emerald-600",
    darkColorClass: "bg-emerald-950/40 text-emerald-400",
    border: "border-l-emerald-500",
  },
  {
    label: "Active Deployments",
    value: "1,284",
    change: 4.1,
    icon: "Globe",
    colorClass: "bg-blue-50 text-blue-600",
    darkColorClass: "bg-blue-950/40 text-blue-400",
    border: "border-l-blue-500",
  },
  {
    label: "Cloud Costs",
    value: "$420K",
    change: -3.2,
    icon: "Database",
    colorClass: "bg-red-50 text-red-600",
    darkColorClass: "bg-red-950/40 text-red-400",
    border: "border-l-red-500",
  },
  {
    label: "Contracts",
    value: "847",
    change: 18.7,
    icon: "FileText",
    colorClass: "bg-purple-50 text-purple-600",
    darkColorClass: "bg-purple-950/40 text-purple-400",
    border: "border-l-purple-500",
  },
  {
    label: "Active Clients",
    value: "452",
    change: 9.3,
    icon: "Users",
    colorClass: "bg-cyan-50 text-cyan-600",
    darkColorClass: "bg-cyan-950/40 text-cyan-400",
    border: "border-l-cyan-500",
  },
  {
    label: "SLA Uptime",
    value: "99.99%",
    change: 0.01,
    icon: "Activity",
    colorClass: "bg-amber-50 text-amber-600",
    darkColorClass: "bg-amber-950/40 text-amber-400",
    border: "border-l-amber-500",
  },
  {
    label: "Tech Talent",
    value: "284",
    change: 5.0,
    icon: "Cpu",
    colorClass: "bg-pink-50 text-pink-600",
    darkColorClass: "bg-pink-950/40 text-pink-400",
    border: "border-l-pink-500",
  }
];

export const activeContracts = [
  {
    id: "CTR-7842",
    client: "Acme Corp",
    service: "Enterprise Web App",
    value: "$124,000",
    status: "active",
    deadline: "Dec 30, 2026",
  },
  {
    id: "CTR-7841",
    client: "TechNova Inc",
    service: "AI Agent Integration",
    value: "$87,500",
    status: "processing",
    deadline: "Oct 15, 2026",
  },
  {
    id: "CTR-7840",
    client: "GlobalStream",
    service: "Cloud Migration",
    value: "$42,100",
    status: "pending",
    deadline: "Jul 29, 2026",
  },
  {
    id: "CTR-7839",
    client: "Meridian Ltd",
    service: "Data Pipeline",
    value: "$54,500",
    status: "completed",
    deadline: "Jun 29, 2026",
  },
  {
    id: "CTR-7838",
    client: "BlueSky Systems",
    service: "React Native App",
    value: "$112,400",
    status: "cancelled",
    deadline: "Aug 28, 2026",
  },
  {
    id: "CTR-7837",
    client: "Quantum Works",
    service: "Security Audit",
    value: "$25,250",
    status: "completed",
    deadline: "Jun 28, 2026",
  }
];

export const topServices = [
  {
    name: "Full-Stack Dev",
    category: "Engineering",
    deals: 148,
    revenue: "$1.83M",
    trend: 14.2,
  },
  {
    name: "AI Automation",
    category: "AI Services",
    deals: 312,
    revenue: "$0.82M",
    trend: 8.7,
  },
  {
    name: "Cloud Ops",
    category: "DevOps",
    deals: 94,
    revenue: "$0.47M",
    trend: 22.1,
  },
  {
    name: "UI/UX Design",
    category: "Design",
    deals: 67,
    revenue: "$0.34M",
    trend: -2.3,
  },
  {
    name: "Managed Support",
    category: "Support",
    deals: 203,
    revenue: "$0.28M",
    trend: 5.4,
  }
];

export const systemAlerts = [
  {
    service: "AWS US-East DB",
    id: "RDS-1042",
    metric: "92% CPU",
    threshold: "90%",
    status: "critical",
  },
  {
    service: "Vercel Build Queue",
    id: "VCL-3311",
    metric: "5m delay",
    threshold: "3m",
    status: "low",
  },
  {
    service: "GitHub Actions",
    id: "GHA-0045",
    metric: "Rate Limit",
    threshold: "80%",
    status: "low",
  },
  {
    service: "OpenAI API",
    id: "OAI-8812",
    metric: "Latency Spike",
    threshold: "2s",
    status: "critical",
  }
];

export const activities = [
  {
    user: "Sarah Chen",
    action: "deployed v2.4 to",
    target: "Acme Corp Prod",
    time: "2m ago",
    icon: "CheckCircle2",
    color: "text-emerald-500",
  },
  {
    user: "Marcus Webb",
    action: "merged PR in",
    target: "react-ui-lib",
    time: "14m ago",
    icon: "GitBranch",
    color: "text-blue-500",
  },
  {
    user: "Priya Nair",
    action: "onboarded client",
    target: "TechNova Inc",
    time: "1h ago",
    icon: "UserPlus",
    color: "text-indigo-500",
  },
  {
    user: "James Liu",
    action: "resolved incident",
    target: "INC-7835",
    time: "2h ago",
    icon: "ShieldCheck",
    color: "text-purple-500",
  },
  {
    user: "Emma Park",
    action: "assigned bug",
    target: "#BUG-8821",
    time: "3h ago",
    icon: "AlertCircle",
    color: "text-amber-500",
  },
  {
    user: "David Kim",
    action: "approved SLA report",
    target: "SLA-2244",
    time: "4h ago",
    icon: "CheckSquare",
    color: "text-emerald-500",
  }
];

export const clients = [
  {
    id: "C-1001",
    name: "Acme Corporation",
    email: "tech@acme.com",
    plan: "Enterprise SLA",
    mrr: "$12,400",
    status: "active",
    joined: "Jan 12, 2024",
    stack: "React/Node",
  },
  {
    id: "C-1002",
    name: "TechNova Inc",
    email: "eng@technova.io",
    plan: "Standard SLA",
    mrr: "$4,200",
    status: "active",
    joined: "Mar 4, 2024",
    stack: "Vue/Python",
  },
  {
    id: "C-1003",
    name: "GlobalStream",
    email: "dev@globalstream.com",
    plan: "Basic Setup",
    mrr: "$700",
    status: "trial",
    joined: "Jun 1, 2026",
    stack: "Next.js",
  },
  {
    id: "C-1004",
    name: "Meridian Ltd",
    email: "ops@meridian.ltd",
    plan: "Standard SLA",
    mrr: "$4,200",
    status: "active",
    joined: "Nov 8, 2023",
    stack: "AWS/Terraform",
  }
];

export const employees = [
  {
    id: "E-401",
    name: "Sarah Chen",
    role: "Senior Full-Stack",
    utilization: 95,
    performance: 98,
    risk: "High",
    aiAssisted: true,
  },
  {
    id: "E-402",
    name: "Marcus Webb",
    role: "DevOps Engineer",
    utilization: 82,
    performance: 92,
    risk: "Low",
    aiAssisted: true,
  },
  {
    id: "E-403",
    name: "Priya Nair",
    role: "AI Integration Spec",
    utilization: 110,
    performance: 99,
    risk: "Critical",
    aiAssisted: false,
  },
  {
    id: "E-404",
    name: "James Liu",
    role: "Frontend Dev",
    utilization: 65,
    performance: 85,
    risk: "Low",
    aiAssisted: true,
  }
];

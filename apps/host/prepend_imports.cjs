const fs = require('fs');

const lucideImports = `import {
  LayoutDashboard, Users, ShoppingCart, Package, DollarSign, TrendingUp, Bell, Search, Menu, X, ChevronDown, ChevronRight, LogOut, Moon, Sun, FileText, Activity, ArrowUpRight, ArrowDownRight, Plus, Download, MoreHorizontal, CheckCircle2, AlertCircle, Clock, Star, Zap, Shield, Building2, CreditCard, RefreshCw, Warehouse, BookOpen, Receipt, UserCheck, GraduationCap, Award, Kanban, Timer, Ticket, MessageSquare, Cpu, Wrench, Folder, Brain, UserCog, Key, Sliders, Mail, Plug, Paintbrush, ShieldCheck, BarChart2, PieChart, Target, TrendingDown, Inbox, Users2, Store, Boxes, MapPin, QrCode, ArrowLeftRight, Landmark, Banknote, Scale, Headphones, FileLock, PlugZap, Tag, CheckSquare, ChevronUp, MoreVertical, Circle, Layers, CalendarDays, GitBranch, AlignLeft, Eye, FolderKanban, ReceiptText, Truck, Globe, Hash, Database, BadgePercent, ClipboardList, BookMarked, HeartHandshake, Gauge, UserPlus, Newspaper, Settings, Filter, ChevronLeft, Home
} from "lucide-react";
`;

function prepend(file, text) {
  const content = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, text + '\n' + content, 'utf8');
}

prepend('src/data/mockData.ts', lucideImports);
prepend('src/config/navigation.ts', lucideImports + 'import { mrrData, revenueByCategoryData, clientGrowthData, CHART_COLORS, kpis, activeContracts, topServices, systemAlerts, activities, clients, employees } from "../data/mockData";\n');


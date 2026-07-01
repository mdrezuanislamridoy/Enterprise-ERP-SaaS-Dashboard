const fs = require('fs');

const commonImports = `import React, { useState } from "react";
import {
  LayoutDashboard, Users, ShoppingCart, Package, DollarSign, TrendingUp, Bell, Search, Menu, X, ChevronDown, ChevronRight, LogOut, Moon, Sun, FileText, Activity, ArrowUpRight, ArrowDownRight, Plus, Download, MoreHorizontal, CheckCircle2, AlertCircle, Clock, Star, Zap, Shield, Building2, CreditCard, RefreshCw, Warehouse, BookOpen, Receipt, UserCheck, GraduationCap, Award, Kanban, Timer, Ticket, MessageSquare, Cpu, Wrench, Folder, Brain, UserCog, Key, Sliders, Mail, Plug, Paintbrush, ShieldCheck, BarChart2, PieChart, Target, TrendingDown, Inbox, Users2, Store, Boxes, MapPin, QrCode, ArrowLeftRight, Landmark, Banknote, Scale, Headphones, FileLock, PlugZap, Tag, CheckSquare, ChevronUp, MoreVertical, Circle, Layers, CalendarDays, GitBranch, AlignLeft, Eye, FolderKanban, ReceiptText, Truck, Globe, Hash, Database, BadgePercent, ClipboardList, BookMarked, HeartHandshake, Gauge, UserPlus, Newspaper, Settings, Filter, ChevronLeft, Home
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend } from "recharts";
import { mrrData, revenueByCategoryData, clientGrowthData, CHART_COLORS, kpis, activeContracts, topServices, systemAlerts, activities, clients, employees } from "../../data/mockData";
import { StatusBadge } from "../../components/common/StatusBadge";
import { KpiCard } from "../../components/common/KpiCard";
import { ChartTooltip } from "../../components/common/ChartTooltip";
import { cn } from "../../lib/utils";
`;

function fixFile(file, exportName) {
  let content = fs.readFileSync(file, 'utf8');
  // replace function Name() with export function Name()
  content = content.replace(`function ${exportName}()`, `export function ${exportName}()`);
  fs.writeFileSync(file, commonImports + '\n' + content, 'utf8');
}

fixFile('src/features/dashboard/DashboardPage.tsx', 'DashboardPage');
fixFile('src/features/clients/ClientsPage.tsx', 'ClientsPage');
fixFile('src/features/contracts/ActiveContractsPage.tsx', 'ActiveContractsPage');
fixFile('src/features/talent/TechTalentPage.tsx', 'TechTalentPage');
fixFile('src/features/ai-insights/AIInsightsPage.tsx', 'AIInsightsPage');

let generic = fs.readFileSync('src/features/common/GenericPage.tsx', 'utf8');
generic = generic.replace('function GenericPage', 'export function GenericPage');
fs.writeFileSync('src/features/common/GenericPage.tsx', `import React from "react";
import { Plus, Download, LayoutDashboard } from "lucide-react";
import { pageLabels, navGroups } from "../../config/navigation";\n` + generic, 'utf8');


import { PrismaClient } from '@prisma/client';
import {
  mrrData,
  clients,
  activeContracts,
  employees,
  systemAlerts,
  revenueByCategoryData,
  topServices,
  kpis,
  clientGrowthData,
  activities,
} from '../src/data';

import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data (optional, for safety during dev)
  await prisma.contract.deleteMany();
  await prisma.client.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.systemAlert.deleteMany();
  await prisma.revenueMetric.deleteMany();
  await prisma.topService.deleteMany();
  await prisma.kpi.deleteMany();
  await prisma.revenueByCategory.deleteMany();
  await prisma.clientGrowth.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.user.deleteMany();
  await prisma.insight.deleteMany();
  await prisma.notification.deleteMany();

  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  // Seed Users
  await prisma.user.create({
    data: {
      email: 'admin@nexus.com',
      password: hashedPassword,
      name: 'Alex Admin',
      role: 'admin',
    },
  });

  // Seed Notifications
  await prisma.notification.createMany({
    data: [
      { title: 'New Client', message: 'GlobalStream joined the Basic Setup plan.', read: false },
      { title: 'System Alert', message: 'AWS US-East DB is under heavy load (92% CPU).', read: false },
    ],
  });

  // Seed AI Insights
  await prisma.insight.createMany({
    data: [
      {
        title: "Revenue Forecast — July 2026",
        desc: "Based on current deployments, projected MRR is $354K (+5.2% over June). Key driver: Enterprise Web App completions and 3 pending AI contracts.",
        type: "forecast",
        icon: "TrendingUp",
        color: "text-indigo-500",
        bg: "bg-indigo-50 dark:bg-indigo-950/30",
      },
      {
        title: "Client Churn Risk",
        desc: "BlueSky Systems shows 73% churn probability. Last API call: 18 days ago. Recommend a proactive technical outreach call.",
        type: "alert",
        icon: "AlertCircle",
        color: "text-red-500",
        bg: "bg-red-50 dark:bg-red-950/30",
      },
      {
        title: "Cloud Optimization",
        desc: "AWS US-East DB is under heavy load (92% CPU). Vercel Build Queue is experiencing 5m delays — upgrade infrastructure today.",
        type: "action",
        icon: "Database",
        color: "text-amber-500",
        bg: "bg-amber-50 dark:bg-amber-950/30",
      },
      {
        title: "Upsell Opportunity",
        desc: "12 clients on Basic Setup have API usage patterns matching Standard SLA triggers. Targeted upgrade campaign could yield $50K+ MRR.",
        type: "opportunity",
        icon: "Zap",
        color: "text-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/30",
      },
    ]
  });

  // Seed Clients
  for (const c of clients) {
    await prisma.client.create({
      data: {
        clientId: c.id,
        name: c.name,
        email: c.email,
        plan: c.plan,
        mrr: c.mrr,
        status: c.status,
        joined: c.joined,
        stack: c.stack,
      },
    });
  }

  // Seed Contracts
  for (const c of activeContracts) {
    await prisma.contract.create({
      data: {
        contractId: c.id,
        clientId: 'C-1001',
        service: c.service,
        value: c.value,
        status: c.status,
        deadline: c.deadline,
      },
    });
  }

  // Seed Employees
  for (const e of employees) {
    await prisma.employee.create({
      data: {
        id: e.id,
        name: e.name,
        role: e.role,
        utilization: e.utilization,
        performance: e.performance,
        burnoutRisk: e.risk,
        aiAssisted: e.aiAssisted,
      },
    });
  }

  // Seed KPIs
  for (const k of kpis) {
    await prisma.kpi.create({
      data: {
        label: k.label,
        value: k.value,
        change: k.change,
        icon: k.icon,
        colorClass: k.colorClass,
        darkColorClass: k.darkColorClass,
        border: k.border,
      },
    });
  }

  // Seed System Alerts
  for (const a of systemAlerts) {
    await prisma.systemAlert.create({
      data: {
        alertId: a.id,
        service: a.service,
        metric: a.metric,
        threshold: a.threshold,
        status: a.status,
      },
    });
  }

  // Seed Revenue Metrics (mrrData)
  for (const m of mrrData) {
    await prisma.revenueMetric.create({
      data: {
        month: m.month,
        mrr: m.mrr,
        costs: m.costs,
        aws: m.aws,
      },
    });
  }

  // Seed Top Services
  for (const s of topServices) {
    await prisma.topService.create({
      data: {
        name: s.name,
        category: s.category,
        deals: s.deals,
        revenue: s.revenue,
        trend: s.trend,
      },
    });
  }

  // Seed Revenue By Category
  for (const r of revenueByCategoryData) {
    await prisma.revenueByCategory.create({
      data: {
        name: r.name,
        value: r.value,
      },
    });
  }

  // Seed Client Growth
  for (const c of clientGrowthData) {
    await prisma.clientGrowth.create({
      data: {
        month: c.month,
        new: c.new,
        churned: c.churned,
        net: c.net,
      },
    });
  }

  // Seed Activities
  for (const a of activities) {
    await prisma.activity.create({
      data: {
        user: a.user,
        action: a.action,
        target: a.target,
        time: a.time,
        icon: a.icon,
        color: a.color,
      },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

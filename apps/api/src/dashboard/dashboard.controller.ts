import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  mrrData as mockMrrData,
  revenueByCategoryData as mockRevenueByCategoryData,
  clientGrowthData as mockClientGrowthData,
  kpis as mockKpis,
  activeContracts as mockActiveContracts,
  topServices as mockTopServices,
  systemAlerts as mockSystemAlerts,
  activities as mockActivities,
} from '../data';

@Controller('api/dashboard')
export class DashboardController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getDashboard() {
    try {
      const [
        mrrData,
        revenueByCategoryData,
        clientGrowthData,
        kpis,
        activeContracts,
        topServices,
        systemAlerts,
        activities,
        totalActiveContracts,
        totalActiveClients,
        totalTalent,
        allClientsForMrr
      ] = await Promise.all([
        this.prisma.revenueMetric.findMany(),
        this.prisma.revenueByCategory.findMany(),
        this.prisma.clientGrowth.findMany(),
        this.prisma.kpi.findMany(),
        this.prisma.contract.findMany({ take: 5, include: { client: true } }),
        this.prisma.topService.findMany(),
        this.prisma.systemAlert.findMany(),
        this.prisma.activity.findMany({ take: 6 }),
        this.prisma.contract.count({ where: { status: 'Active' } }),
        this.prisma.client.count({ where: { status: 'Active' } }),
        this.prisma.employee.count(),
        this.prisma.client.findMany({ select: { mrr: true } })
      ]);

      if (kpis.length === 0) throw new Error("Empty DB");
      
      let totalMrr = 0;
      for (const client of allClientsForMrr) {
        const numericMrr = parseInt(client.mrr.replace(/[^0-9]/g, ''));
        if (!isNaN(numericMrr)) totalMrr += numericMrr;
      }
      
      // Update KPIs dynamically
      const dynamicKpis = kpis.map(kpi => {
        if (kpi.label === 'Contracts') {
          return { ...kpi, value: totalActiveContracts.toString() };
        }
        if (kpi.label === 'Active Clients') {
          return { ...kpi, value: totalActiveClients.toString() };
        }
        if (kpi.label === 'Tech Talent') {
          return { ...kpi, value: totalTalent.toString() };
        }
        if (kpi.label === 'MRR') {
          // format MRR correctly (e.g. $1.5M or $500K)
          const mFormatted = totalMrr >= 1000000 
            ? `$${(totalMrr / 1000000).toFixed(1)}M` 
            : `$${(totalMrr / 1000).toFixed(0)}K`;
          return { ...kpi, value: mFormatted }; 
        }
        return kpi;
      });

      const formattedContracts = activeContracts.map(c => ({
        ...c,
        id: c.contractId,
        client: c.client?.name || c.clientId
      }));
      
      const formattedAlerts = systemAlerts.map(a => ({
        ...a,
        id: a.alertId
      }));

      return {
        mrrData,
        revenueByCategoryData,
        clientGrowthData,
        kpis: dynamicKpis,
        activeContracts: formattedContracts,
        topServices,
        systemAlerts: formattedAlerts,
        activities
      };
    } catch (error) {
      return {
        mrrData: mockMrrData,
        revenueByCategoryData: mockRevenueByCategoryData,
        clientGrowthData: mockClientGrowthData,
        kpis: mockKpis,
        activeContracts: mockActiveContracts.slice(0, 5),
        topServices: mockTopServices,
        systemAlerts: mockSystemAlerts,
        activities: mockActivities.slice(0, 6),
      };
    }
  }

  @Get('search')
  async search() {
    return {
      results: [
        { id: '1', title: 'BlueSky Systems', type: 'Client' },
        { id: '2', title: 'Q3 Enterprise Architecture', type: 'Contract' },
        { id: '3', title: 'Sarah Chen', type: 'Talent' }
      ]
    };
  }

  @Get('notifications')
  async getNotifications() {
    try {
      const notifs = await this.prisma.notification.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
      });
      return { notifications: notifs };
    } catch {
      return { notifications: [] };
    }
  }
}


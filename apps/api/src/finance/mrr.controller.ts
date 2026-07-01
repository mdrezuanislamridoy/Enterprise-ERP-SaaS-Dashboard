import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/mrr')
export class MrrController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getMrr() {
    // Aggregate MRR from clients
    const clients = await this.prisma.client.findMany();
    const totalMrr = clients.reduce((sum, c) => {
      const num = parseFloat(c.mrr.replace(/[^0-9.]/g, ''));
      return sum + (isNaN(num) ? 0 : num);
    }, 0);
    
    const revenueMetrics = await this.prisma.revenueMetric.findMany();
    
    return {
      totalMrr: `$${totalMrr.toLocaleString()}`,
      activeClients: clients.filter(c => c.status === 'Active').length,
      totalClients: clients.length,
      revenueMetrics,
    };
  }
}

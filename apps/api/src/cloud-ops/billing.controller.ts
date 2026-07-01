import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/billing')
export class BillingController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getBilling() {
    const billing = await this.prisma.billing.findMany();
    return { billing };
  }

  @Post()
  async createBilling(@Body() body: any) {
    const billing = await this.prisma.billing.create({
      data: {
        service: body.service,
        cost: parseFloat(body.cost) || 0.0,
        trend: parseFloat(body.trend) || 0.0,
        status: body.status || "Stable",
        lastUpdated: body.lastUpdated || new Date().toISOString().split('T')[0],
      }
    });
    return { billing };
  }

  @Patch(':id')
  async updateBilling(@Param('id') id: string, @Body() body: any) {
    const billing = await this.prisma.billing.update({
      where: { id },
      data: {
        service: body.service,
        cost: body.cost !== undefined ? parseFloat(body.cost) : undefined,
        trend: body.trend !== undefined ? parseFloat(body.trend) : undefined,
        status: body.status,
        lastUpdated: body.lastUpdated,
      }
    });
    return { billing };
  }

  @Delete(':id')
  async deleteBilling(@Param('id') id: string) {
    await this.prisma.billing.delete({ where: { id } });
    return { success: true };
  }
}

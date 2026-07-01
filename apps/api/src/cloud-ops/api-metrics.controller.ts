import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/api-metrics')
export class ApiMetricsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getMetrics() {
    const metrics = await this.prisma.apiMetric.findMany();
    return { metrics };
  }

  @Post()
  async createMetric(@Body() body: any) {
    const metric = await this.prisma.apiMetric.create({
      data: {
        endpoint: body.endpoint,
        requests: parseInt(body.requests) || 0,
        latency: parseInt(body.latency) || 0,
        errorRate: parseFloat(body.errorRate) || 0.0,
        status: body.status || "Normal",
      }
    });
    return { metric };
  }

  @Patch(':id')
  async updateMetric(@Param('id') id: string, @Body() body: any) {
    const metric = await this.prisma.apiMetric.update({
      where: { id },
      data: {
        endpoint: body.endpoint,
        requests: body.requests !== undefined ? parseInt(body.requests) : undefined,
        latency: body.latency !== undefined ? parseInt(body.latency) : undefined,
        errorRate: body.errorRate !== undefined ? parseFloat(body.errorRate) : undefined,
        status: body.status,
      }
    });
    return { metric };
  }

  @Delete(':id')
  async deleteMetric(@Param('id') id: string) {
    await this.prisma.apiMetric.delete({ where: { id } });
    return { success: true };
  }
}

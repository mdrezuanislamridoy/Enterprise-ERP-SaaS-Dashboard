import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/alerts')
export class AlertsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAlerts() {
    const alerts = await this.prisma.systemAlert.findMany();
    return { alerts };
  }

  @Post()
  async createAlert(@Body() body: any) {
    const alert = await this.prisma.systemAlert.create({
      data: {
        alertId: `ALT-${Date.now()}`,
        service: body.service,
        metric: body.metric,
        threshold: body.threshold,
        status: body.status || "Warning",
      }
    });
    return { alert };
  }

  @Patch(':id')
  async updateAlert(@Param('id') id: string, @Body() body: any) {
    const alert = await this.prisma.systemAlert.update({
      where: { id },
      data: {
        service: body.service,
        metric: body.metric,
        threshold: body.threshold,
        status: body.status,
      }
    });
    return { alert };
  }

  @Delete(':id')
  async deleteAlert(@Param('id') id: string) {
    await this.prisma.systemAlert.delete({ where: { id } });
    return { success: true };
  }
}

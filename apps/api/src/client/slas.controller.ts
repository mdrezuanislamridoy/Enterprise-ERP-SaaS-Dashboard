import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/slas')
export class SlasController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getSlas() {
    const slas = await this.prisma.sla.findMany();
    return { slas };
  }

  @Post()
  async createSla(@Body() body: any) {
    const count = await this.prisma.sla.count();
    const sla = await this.prisma.sla.create({
      data: {
        slaId: `SLA-${1000 + count + 1}`,
        clientName: body.clientName,
        service: body.service,
        uptime: body.uptime || "99.9%",
        status: body.status || "Met",
      }
    });
    return { sla };
  }

  @Patch(':id')
  async updateSla(@Param('id') id: string, @Body() body: any) {
    const sla = await this.prisma.sla.update({
      where: { id },
      data: {
        clientName: body.clientName,
        service: body.service,
        uptime: body.uptime,
        status: body.status,
      }
    });
    return { sla };
  }

  @Delete(':id')
  async deleteSla(@Param('id') id: string) {
    await this.prisma.sla.delete({ where: { id } });
    return { success: true };
  }
}

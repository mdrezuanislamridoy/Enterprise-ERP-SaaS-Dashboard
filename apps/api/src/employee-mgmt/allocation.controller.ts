import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/allocation')
export class AllocationController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAll() { return { items: await this.prisma.allocation.findMany() }; }

  @Post()
  async create(@Body() body: any) {
    const item = await this.prisma.allocation.create({ data: { employee: body.employee, project: body.project, role: body.role, hours: parseInt(body.hours) || 40, startDate: body.startDate, endDate: body.endDate } });
    return { item };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const item = await this.prisma.allocation.update({ where: { id }, data: { employee: body.employee, project: body.project, role: body.role, hours: body.hours !== undefined ? parseInt(body.hours) : undefined, startDate: body.startDate, endDate: body.endDate } });
    return { item };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) { await this.prisma.allocation.delete({ where: { id } }); return { success: true }; }
}

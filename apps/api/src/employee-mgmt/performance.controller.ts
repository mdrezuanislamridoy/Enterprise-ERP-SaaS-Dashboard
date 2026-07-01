import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/performance')
export class PerformanceController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAll() { return { items: await this.prisma.performance.findMany() }; }

  @Post()
  async create(@Body() body: any) {
    const item = await this.prisma.performance.create({ data: { employee: body.employee, period: body.period, score: parseInt(body.score) || 0, rating: body.rating || 'Good', notes: body.notes } });
    return { item };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const item = await this.prisma.performance.update({ where: { id }, data: { employee: body.employee, period: body.period, score: body.score !== undefined ? parseInt(body.score) : undefined, rating: body.rating, notes: body.notes } });
    return { item };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) { await this.prisma.performance.delete({ where: { id } }); return { success: true }; }
}

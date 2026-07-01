import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/margin-analysis')
export class MarginAnalysisController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAll() { return { items: await this.prisma.marginAnalysis.findMany() }; }

  @Post()
  async create(@Body() body: any) {
    const revenue = parseFloat(body.revenue) || 0;
    const cost = parseFloat(body.cost) || 0;
    const margin = revenue > 0 ? ((revenue - cost) / revenue) * 100 : 0;
    const item = await this.prisma.marginAnalysis.create({ data: { project: body.project, revenue, cost, margin: parseFloat(margin.toFixed(1)), status: body.status || 'Active' } });
    return { item };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const revenue = body.revenue !== undefined ? parseFloat(body.revenue) : undefined;
    const cost = body.cost !== undefined ? parseFloat(body.cost) : undefined;
    const data: any = { project: body.project, status: body.status };
    if (revenue !== undefined) data.revenue = revenue;
    if (cost !== undefined) data.cost = cost;
    if (revenue !== undefined && cost !== undefined) data.margin = parseFloat((((revenue - cost) / revenue) * 100).toFixed(1));
    const item = await this.prisma.marginAnalysis.update({ where: { id }, data });
    return { item };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) { await this.prisma.marginAnalysis.delete({ where: { id } }); return { success: true }; }
}

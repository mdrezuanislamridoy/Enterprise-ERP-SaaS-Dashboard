import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/delivery-reports')
export class DeliveryReportsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAll() { return { items: await this.prisma.deliveryReport.findMany() }; }

  @Post()
  async create(@Body() body: any) {
    const item = await this.prisma.deliveryReport.create({ data: { project: body.project, client: body.client, status: body.status || 'In Progress', completion: parseInt(body.completion) || 0, dueDate: body.dueDate } });
    return { item };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const item = await this.prisma.deliveryReport.update({ where: { id }, data: { project: body.project, client: body.client, status: body.status, completion: body.completion !== undefined ? parseInt(body.completion) : undefined, dueDate: body.dueDate } });
    return { item };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) { await this.prisma.deliveryReport.delete({ where: { id } }); return { success: true }; }
}

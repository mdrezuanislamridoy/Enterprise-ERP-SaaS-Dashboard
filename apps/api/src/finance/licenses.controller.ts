import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/licenses')
export class LicensesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAll() { return { items: await this.prisma.license.findMany() }; }

  @Post()
  async create(@Body() body: any) {
    const item = await this.prisma.license.create({ data: { software: body.software, vendor: body.vendor, seats: parseInt(body.seats) || 1, cost: body.cost, renewalDate: body.renewalDate, status: body.status || 'Active' } });
    return { item };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const item = await this.prisma.license.update({ where: { id }, data: { software: body.software, vendor: body.vendor, seats: body.seats !== undefined ? parseInt(body.seats) : undefined, cost: body.cost, renewalDate: body.renewalDate, status: body.status } });
    return { item };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) { await this.prisma.license.delete({ where: { id } }); return { success: true }; }
}

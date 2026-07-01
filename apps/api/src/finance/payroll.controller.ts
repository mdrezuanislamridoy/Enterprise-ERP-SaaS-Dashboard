import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/payroll')
export class PayrollController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAll() { return { items: await this.prisma.payroll.findMany() }; }

  @Post()
  async create(@Body() body: any) {
    const item = await this.prisma.payroll.create({ data: { employee: body.employee, period: body.period, salary: body.salary, deductions: body.deductions || '$0', netPay: body.netPay, status: body.status || 'Pending' } });
    return { item };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const item = await this.prisma.payroll.update({ where: { id }, data: { employee: body.employee, period: body.period, salary: body.salary, deductions: body.deductions, netPay: body.netPay, status: body.status } });
    return { item };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) { await this.prisma.payroll.delete({ where: { id } }); return { success: true }; }
}

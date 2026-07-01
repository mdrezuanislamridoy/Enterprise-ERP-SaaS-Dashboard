import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/invoices')
export class InvoicesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAll() { return { items: await this.prisma.invoice.findMany() }; }

  @Post()
  async create(@Body() body: any) {
    const count = await this.prisma.invoice.count();
    const item = await this.prisma.invoice.create({ data: { invoiceId: `INV-${1000 + count + 1}`, clientName: body.clientName, amount: body.amount, status: body.status || 'Pending', dueDate: body.dueDate, issuedDate: body.issuedDate || new Date().toISOString().split('T')[0] } });
    return { item };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const item = await this.prisma.invoice.update({ where: { id }, data: { clientName: body.clientName, amount: body.amount, status: body.status, dueDate: body.dueDate, issuedDate: body.issuedDate } });
    return { item };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) { await this.prisma.invoice.delete({ where: { id } }); return { success: true }; }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { clients as mockClients } from '../data';

@Controller('api/clients')
export class ClientController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getClients() {
    try {
      const clients = await this.prisma.client.findMany();
      if (clients.length === 0) throw new Error("Empty DB");
      return { clients };
    } catch {
      return { clients: mockClients };
    }
  }

  @Post()
  async createClient(@Body() body: any) {
    // Generate a unique clientId (e.g. C-XXXX)
    const count = await this.prisma.client.count();
    const newId = `C-${1000 + count + 1}`;
    
    const client = await this.prisma.client.create({
      data: {
        clientId: newId,
        name: body.name,
        email: body.email,
        plan: body.plan,
        mrr: body.mrr,
        status: body.status || "Active",
        joined: body.joined || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        stack: body.stack || "React, Node.js",
      },
    });
    return { client };
  }

  @Patch(':id')
  async updateClient(@Param('id') id: string, @Body() body: any) {
    const client = await this.prisma.client.update({
      where: { clientId: id },
      data: {
        name: body.name,
        email: body.email,
        plan: body.plan,
        mrr: body.mrr,
        status: body.status,
        joined: body.joined,
        stack: body.stack,
      },
    });
    return { client };
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: string) {
    await this.prisma.client.delete({
      where: { clientId: id },
    });
    return { success: true };
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { activeContracts as mockActiveContracts } from '../data';

@Controller('api/contracts')
export class ContractController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getContracts() {
    try {
      const contracts = await this.prisma.contract.findMany({
        include: { client: true }
      });
      if (contracts.length === 0) throw new Error("Empty DB");
      
      const formattedContracts = contracts.map(c => ({
        ...c,
        id: c.contractId,
        client: c.client?.name || c.clientId // map client object back to string name
      }));

      return { activeContracts: formattedContracts };
    } catch {
      return { activeContracts: mockActiveContracts };
    }
  }

  @Post()
  async createContract(@Body() body: any) {
    const count = await this.prisma.contract.count();
    const newId = `CNTR-${1000 + count + 1}`;

    // ensure client exists, if body.clientName is provided, we might need to find it or just assume a default
    // we'll just link to 'C-1001' or a dynamic one if provided
    let clientId = body.clientId || 'C-1001';
    
    // If frontend sends a string for client, let's just find first client to attach to it (simple mock behavior)
    if (body.clientName) {
      const client = await this.prisma.client.findFirst({ where: { name: body.clientName } });
      if (client) clientId = client.clientId;
    }

    const contract = await this.prisma.contract.create({
      data: {
        contractId: newId,
        clientId: clientId,
        service: body.service,
        value: body.value,
        status: body.status || "Active",
        deadline: body.deadline || "TBD",
      },
      include: { client: true }
    });
    
    return {
      contract: {
        ...contract,
        id: contract.contractId,
        client: contract.client?.name || contract.clientId
      }
    };
  }
  @Patch(':id')
  async updateContract(@Param('id') id: string, @Body() body: any) {
    let clientId = body.clientId;
    if (body.clientName) {
      const client = await this.prisma.client.findFirst({ where: { name: body.clientName } });
      if (client) clientId = client.clientId;
    }

    const contract = await this.prisma.contract.update({
      where: { contractId: id },
      data: {
        ...(clientId && { clientId }),
        service: body.service,
        value: body.value,
        status: body.status,
        deadline: body.deadline,
      },
      include: { client: true }
    });
    
    return { 
      contract: {
        ...contract,
        id: contract.contractId,
        client: contract.client?.name || contract.clientId
      }
    };
  }

  @Delete(':id')
  async deleteContract(@Param('id') id: string) {
    await this.prisma.contract.delete({
      where: { contractId: id },
    });
    return { success: true };
  }
}

import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/proposals')
export class ProposalsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getProposals() {
    const proposals = await this.prisma.proposal.findMany();
    return { proposals };
  }

  @Post()
  async createProposal(@Body() body: any) {
    const count = await this.prisma.proposal.count();
    const proposal = await this.prisma.proposal.create({
      data: {
        proposalId: `PROP-${1000 + count + 1}`,
        clientName: body.clientName,
        title: body.title,
        value: body.value,
        status: body.status || "Pending",
        date: body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      }
    });
    return { proposal };
  }

  @Patch(':id')
  async updateProposal(@Param('id') id: string, @Body() body: any) {
    const proposal = await this.prisma.proposal.update({
      where: { id },
      data: {
        clientName: body.clientName,
        title: body.title,
        value: body.value,
        status: body.status,
        date: body.date,
      }
    });
    return { proposal };
  }

  @Delete(':id')
  async deleteProposal(@Param('id') id: string) {
    await this.prisma.proposal.delete({ where: { id } });
    return { success: true };
  }
}

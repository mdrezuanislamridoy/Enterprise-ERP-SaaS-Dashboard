import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/nodes')
export class NodesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getNodes() {
    const nodes = await this.prisma.serverNode.findMany();
    return { nodes };
  }

  @Post()
  async createNode(@Body() body: any) {
    const node = await this.prisma.serverNode.create({
      data: {
        nodeId: `NODE-${Date.now()}`,
        name: body.name,
        region: body.region,
        status: body.status || "Healthy",
        cpuUsage: parseInt(body.cpuUsage) || 0,
        memoryUsage: parseInt(body.memoryUsage) || 0,
        uptime: body.uptime || "99.99%",
      }
    });
    return { node };
  }

  @Patch(':id')
  async updateNode(@Param('id') id: string, @Body() body: any) {
    const node = await this.prisma.serverNode.update({
      where: { id },
      data: {
        name: body.name,
        region: body.region,
        status: body.status,
        cpuUsage: body.cpuUsage !== undefined ? parseInt(body.cpuUsage) : undefined,
        memoryUsage: body.memoryUsage !== undefined ? parseInt(body.memoryUsage) : undefined,
        uptime: body.uptime,
      }
    });
    return { node };
  }

  @Delete(':id')
  async deleteNode(@Param('id') id: string) {
    await this.prisma.serverNode.delete({ where: { id } });
    return { success: true };
  }
}

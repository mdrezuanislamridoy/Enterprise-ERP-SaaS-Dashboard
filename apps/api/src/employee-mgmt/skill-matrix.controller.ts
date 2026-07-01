import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/skill-matrix')
export class SkillMatrixController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAll() { return { items: await this.prisma.skillMatrix.findMany() }; }

  @Post()
  async create(@Body() body: any) {
    const item = await this.prisma.skillMatrix.create({ data: { employee: body.employee, skill: body.skill, level: body.level || 'Beginner', certified: body.certified || false } });
    return { item };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const item = await this.prisma.skillMatrix.update({ where: { id }, data: { employee: body.employee, skill: body.skill, level: body.level, certified: body.certified } });
    return { item };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) { await this.prisma.skillMatrix.delete({ where: { id } }); return { success: true }; }
}

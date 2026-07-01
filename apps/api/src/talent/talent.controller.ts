import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { employees as mockEmployees } from '../data';

@Controller('api/talent')
export class TalentController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getTalent() {
    try {
      const employees = await this.prisma.employee.findMany();
      if (employees.length === 0) throw new Error("Empty DB");
      
      const formattedEmployees = employees.map(e => ({
        ...e,
        risk: e.burnoutRisk
      }));

      return { employees: formattedEmployees };
    } catch {
      return { employees: mockEmployees };
    }
  }

  @Post()
  async createTalent(@Body() body: any) {
    const count = await this.prisma.employee.count();
    const newId = `E-${1000 + count + 1}`;
    
    const employee = await this.prisma.employee.create({
      data: {
        id: newId,
        name: body.name,
        role: body.role,
        utilization: parseInt(body.utilization) || 0,
        performance: parseInt(body.performance) || 0,
        burnoutRisk: body.risk || "Low",
        dept: body.dept || "Engineering",
        email: body.email || `${body.name.split(' ')[0].toLowerCase()}@nexus.com`,
        salary: body.salary || "$120,000",
        status: body.status || "active",
        joined: body.joined || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      }
    });

    return { 
      employee: {
        ...employee,
        risk: employee.burnoutRisk
      } 
    };
  }

  @Patch(':id')
  async updateTalent(@Param('id') id: string, @Body() body: any) {
    const dataToUpdate: any = {};
    if (body.name !== undefined) dataToUpdate.name = body.name;
    if (body.role !== undefined) dataToUpdate.role = body.role;
    if (body.utilization !== undefined) dataToUpdate.utilization = parseInt(body.utilization);
    if (body.performance !== undefined) dataToUpdate.performance = parseInt(body.performance);
    if (body.risk !== undefined) dataToUpdate.burnoutRisk = body.risk;
    if (body.dept !== undefined) dataToUpdate.dept = body.dept;
    if (body.email !== undefined) dataToUpdate.email = body.email;
    if (body.salary !== undefined) dataToUpdate.salary = body.salary;
    if (body.status !== undefined) dataToUpdate.status = body.status;
    if (body.joined !== undefined) dataToUpdate.joined = body.joined;

    const employee = await this.prisma.employee.update({
      where: { id },
      data: dataToUpdate
    });
    
    return { 
      employee: {
        ...employee,
        risk: employee.burnoutRisk
      } 
    };
  }

  @Delete(':id')
  async deleteTalent(@Param('id') id: string) {
    await this.prisma.employee.delete({
      where: { id },
    });
    return { success: true };
  }
}

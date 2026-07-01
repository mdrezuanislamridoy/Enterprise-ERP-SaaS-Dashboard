import { Module } from '@nestjs/common';
import { SkillMatrixController } from './skill-matrix.controller';
import { PerformanceController } from './performance.controller';
import { AllocationController } from './allocation.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SkillMatrixController, PerformanceController, AllocationController],
})
export class EmployeeMgmtModule {}

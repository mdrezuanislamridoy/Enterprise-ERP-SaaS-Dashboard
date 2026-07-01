import { Module } from '@nestjs/common';
import { DeliveryReportsController } from './delivery-reports.controller';
import { MarginAnalysisController } from './margin-analysis.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DeliveryReportsController, MarginAnalysisController],
})
export class ReportsModule {}

import { Module } from '@nestjs/common';
import { AlertsController } from './alerts.controller';
import { NodesController } from './nodes.controller';
import { ApiMetricsController } from './api-metrics.controller';
import { BillingController } from './billing.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [
    AlertsController,
    NodesController,
    ApiMetricsController,
    BillingController,
  ],
})
export class CloudOpsModule {}

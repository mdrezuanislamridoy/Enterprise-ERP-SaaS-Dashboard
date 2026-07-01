import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ClientModule } from './client/client.module';
import { ContractModule } from './contract/contract.module';
import { TalentModule } from './talent/talent.module';
import { AiModule } from './ai/ai.module';
import { CloudOpsModule } from './cloud-ops/cloud-ops.module';
import { EmployeeMgmtModule } from './employee-mgmt/employee-mgmt.module';
import { FinanceModule } from './finance/finance.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    DashboardModule,
    ClientModule,
    ContractModule,
    TalentModule,
    AiModule,
    CloudOpsModule,
    EmployeeMgmtModule,
    FinanceModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { PayrollController } from './payroll.controller';
import { LicensesController } from './licenses.controller';
import { MrrController } from './mrr.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InvoicesController, PayrollController, LicensesController, MrrController],
})
export class FinanceModule {}

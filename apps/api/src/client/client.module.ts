import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ProposalsController } from './proposals.controller';
import { SlasController } from './slas.controller';
import { PrismaModule } from '../prisma.module';
import { ClientService } from './client.service';

@Module({
  imports: [PrismaModule],
  controllers: [ClientController, ProposalsController, SlasController],
  providers: [ClientService]
})
export class ClientModule {}

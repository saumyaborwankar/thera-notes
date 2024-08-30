import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from '../../models/client.entity';
import { ClientServiceController } from './clientService.controller';
import { ClientServiceService } from './clientService.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientServiceController],
  providers: [ClientServiceService],
})
export class ClientServiceModule {}

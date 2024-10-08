import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { AtGuard } from '../../common/guards/at.guard';
import { NewClientDetails } from './dto/client.dto';
import { Client } from '../../models/client.entity';
import { GetCurrentUserId } from '../../common/guards/decorators/getCurrentUserId.decorator';

@Controller('client')
@UseGuards(AtGuard)
export class ClientController {
  constructor(private readonly clientServiceService: ClientService) {}

  @Post('/')
  addClient(
    @GetCurrentUserId() userId: string,
    @Body() newClientDetails: NewClientDetails,
  ): Promise<Client> {
    return this.clientServiceService.addNewClient(newClientDetails, userId);
  }

  @Get('/')
  getClients(@GetCurrentUserId() userId: string): Promise<Client[]> {
    return this.clientServiceService.getClients(userId);
  }

  @Get('/:clientId')
  getClientById(
    @GetCurrentUserId() userId: string,
    @Param('clientId') clientId: string,
  ): Promise<Client> {
    return this.clientServiceService.getClientById(userId, clientId);
  }

  @Delete('/:clientId')
  deleteClient(
    @GetCurrentUserId() userId: string,
    @Param('clientId') clientId: string,
  ): Promise<void> {
    return this.clientServiceService.deleteClient(clientId, userId);
  }
}

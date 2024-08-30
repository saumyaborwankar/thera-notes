import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientServiceService } from './clientService.service';

@Controller('client-service')
export class ClientServiceController {
  constructor(private readonly clientServiceService: ClientServiceService) {}

  // @Post()
  // create(@Body() createVideoServiceDto: CreateVideoServiceDto) {
  //   return this.videoServiceService.create(createVideoServiceDto);
  // }

  // @Get()
  // findAll() {
  //   return this.videoServiceService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.videoServiceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVideoServiceDto: UpdateVideoServiceDto) {
  //   return this.videoServiceService.update(+id, updateVideoServiceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.videoServiceService.remove(+id);
  // }

  //   @Get(`/url`)
  //   getUploadUrl() {
  //     return this.videoServiceService.getVideoUploadUrl('');
  //   }
}

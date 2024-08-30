import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientServiceService: ClientService) {}

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

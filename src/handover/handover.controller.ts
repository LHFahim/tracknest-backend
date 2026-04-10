import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HandoverService } from './handover.service';
import { CreateHandoverDto } from './dto/create-handover.dto';
import { UpdateHandoverDto } from './dto/update-handover.dto';

@Controller('handover')
export class HandoverController {
  constructor(private readonly handoverService: HandoverService) {}

  @Post()
  create(@Body() createHandoverDto: CreateHandoverDto) {
    return this.handoverService.create(createHandoverDto);
  }

  @Get()
  findAll() {
    return this.handoverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.handoverService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHandoverDto: UpdateHandoverDto) {
    return this.handoverService.update(+id, updateHandoverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.handoverService.remove(+id);
  }
}

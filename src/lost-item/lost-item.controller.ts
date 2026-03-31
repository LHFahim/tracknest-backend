import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LostItemService } from './lost-item.service';
import { CreateLostItemDto } from './dto/create-lost-item.dto';
import { UpdateLostItemDto } from './dto/update-lost-item.dto';

@Controller('lost-item')
export class LostItemController {
  constructor(private readonly lostItemService: LostItemService) {}

  @Post()
  create(@Body() createLostItemDto: CreateLostItemDto) {
    return this.lostItemService.create(createLostItemDto);
  }

  @Get()
  findAll() {
    return this.lostItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lostItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLostItemDto: UpdateLostItemDto) {
    return this.lostItemService.update(+id, updateLostItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lostItemService.remove(+id);
  }
}

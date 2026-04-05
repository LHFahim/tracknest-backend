import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoundItemService } from './found-item.service';
import { CreateFoundItemDto } from './dto/create-found-item.dto';
import { UpdateFoundItemDto } from './dto/update-found-item.dto';

@Controller('found-item')
export class FoundItemController {
  constructor(private readonly foundItemService: FoundItemService) {}

  @Post()
  create(@Body() createFoundItemDto: CreateFoundItemDto) {
    return this.foundItemService.create(createFoundItemDto);
  }

  @Get()
  findAll() {
    return this.foundItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foundItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoundItemDto: UpdateFoundItemDto) {
    return this.foundItemService.update(+id, updateFoundItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foundItemService.remove(+id);
  }
}

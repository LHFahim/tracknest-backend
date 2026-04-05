import { Injectable } from '@nestjs/common';
import { CreateFoundItemDto } from './dto/create-found-item.dto';
import { UpdateFoundItemDto } from './dto/update-found-item.dto';

@Injectable()
export class FoundItemService {
  create(createFoundItemDto: CreateFoundItemDto) {
    return 'This action adds a new foundItem';
  }

  findAll() {
    return `This action returns all foundItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foundItem`;
  }

  update(id: number, updateFoundItemDto: UpdateFoundItemDto) {
    return `This action updates a #${id} foundItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} foundItem`;
  }
}

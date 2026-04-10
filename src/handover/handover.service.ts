import { Injectable } from '@nestjs/common';
import { CreateHandoverDto } from './dto/create-handover.dto';
import { UpdateHandoverDto } from './dto/update-handover.dto';

@Injectable()
export class HandoverService {
  create(createHandoverDto: CreateHandoverDto) {
    return 'This action adds a new handover';
  }

  findAll() {
    return `This action returns all handover`;
  }

  findOne(id: number) {
    return `This action returns a #${id} handover`;
  }

  update(id: number, updateHandoverDto: UpdateHandoverDto) {
    return `This action updates a #${id} handover`;
  }

  remove(id: number) {
    return `This action removes a #${id} handover`;
  }
}

import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  CreateHandoverDto,
  HandoverDto,
} from 'src/handover/dto/handover.dto';
import { HandoverEntity } from 'src/handover/entities/handover.entity';

@Injectable()
export class AdminHandoverService extends SerializeService<HandoverEntity> {
  constructor(
    @InjectModel(HandoverEntity)
    private readonly handoverModel: ReturnModelType<typeof HandoverEntity>,
  ) {
    super(HandoverEntity);
  }

  async createOne(userId: string, body: CreateHandoverDto) {
    const handover = await this.handoverModel.create({
      ...body,
      handedOverBy: userId,
    });

    return this.toJSON(handover, HandoverDto);
  }
}

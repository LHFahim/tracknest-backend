import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  HandoverDto,
  HandoverPaginatedDto,
  HandoverQueryDto,
} from './dto/handover.dto';
import { HandoverEntity } from './entities/handover.entity';

@Injectable()
export class HandoverService extends SerializeService<HandoverEntity> {
  constructor(
    @InjectModel(HandoverEntity)
    private readonly handoverModel: ReturnModelType<typeof HandoverEntity>,
  ) {
    super(HandoverEntity);
  }

  async findAll(
    userId: string,
    query: HandoverQueryDto,
  ): Promise<HandoverPaginatedDto> {
    const filters = {
      receivedByUser: userId,
      ...(query.search && {
        $or: [
          { note: new RegExp(`.*${query.search}.*`, 'i') },
          { verificationMethod: new RegExp(`.*${query.search}.*`, 'i') },
        ],
      }),
    };

    const items = await this.handoverModel
      .find(filters)
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    const total = await this.handoverModel.countDocuments(filters);

    return {
      items: this.toJSONs(items, HandoverDto),
      pagination: {
        total,
        current: query.page,
        previous: query.page === 1 ? 1 : query.page - 1,
        next: total > query.page * query.pageSize ? query.page + 1 : query.page,
      },
    };
  }

  async findOne(userId: string, id: string) {
    const handover = await this.handoverModel.findOne({
      _id: id,
      receivedByUser: userId,
    });

    if (!handover) {
      throw new NotFoundException('Handover not found');
    }

    return this.toJSON(handover, HandoverDto);
  }
}

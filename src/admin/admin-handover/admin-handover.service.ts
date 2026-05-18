import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  CreateHandoverDto,
  HandoverDto,
  HandoverPaginatedDto,
  HandoverQueryDto,
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

  async findAll(
    userId: string,
    query: HandoverQueryDto,
  ): Promise<HandoverPaginatedDto> {
    const filters = {
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

    const serialized = this.toJSONs(items, HandoverDto);
    console.log('[handover:findAll] raw foundItem values:', items.map(i => ({ raw: i.foundItem, type: typeof i.foundItem, str: String(i.foundItem) })));
    console.log('[handover:findAll] serialized foundItem values:', serialized.map(s => ({ foundItem: s.foundItem, type: typeof s.foundItem })));

    return {
      items: serialized,
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
    });

    if (!handover) throw new NotFoundException('Handover not found');

    return this.toJSON(handover, HandoverDto);
  }

  async createOne(userId: string, body: CreateHandoverDto) {
    console.log('[handover:createOne] body received:', JSON.stringify(body));
    const handover = await this.handoverModel.create({
      ...body,
      handedOverBy: userId,
    });
    console.log('[handover:createOne] stored foundItem:', { raw: handover.foundItem, type: typeof handover.foundItem, str: String(handover.foundItem) });

    const result = this.toJSON(handover, HandoverDto);
    console.log('[handover:createOne] serialized foundItem:', { foundItem: result.foundItem, type: typeof result.foundItem });
    return result;
  }
}

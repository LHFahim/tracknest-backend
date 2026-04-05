import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  CreateLostItemDto,
  LostItemDto,
  LostItemPaginatedDto,
  LostItemQueryDto,
  UpdateLostItemDto,
  UpdateLostItemStatusDto,
} from './dto/lost-item.dto';
import {
  LostItemEntity,
  LostItemStatusEnum,
} from './entities/lost-item.entity';

@Injectable()
export class LostItemService extends SerializeService<LostItemEntity> {
  constructor(
    @InjectModel(LostItemEntity)
    private readonly lostItemModel: ReturnModelType<typeof LostItemEntity>,
  ) {
    super(LostItemEntity);
  }

  async create(userId: string, createLostItemDto: CreateLostItemDto) {
    const lostItem = await this.lostItemModel.create({
      ...createLostItemDto,

      gpsLocation: {
        latitude: createLostItemDto.gpsLocation.latitude,
        longitude: createLostItemDto.gpsLocation.longitude,
      },

      status: LostItemStatusEnum.OPEN,
      createdBy: userId,

      isActive: true,
      isDeleted: false,
    });

    return this.toJSON(lostItem, LostItemDto);
  }

  async findAll(
    userId: string,
    query: LostItemQueryDto,
  ): Promise<LostItemPaginatedDto> {
    const filters = {
      isDeleted: false,
      ...(query.search && {
        $or: [
          { title: new RegExp(`.*${query.search}.*`, 'i') },
          { description: new RegExp(`.*${query.search}.*`, 'i') },
          { locationLost: new RegExp(`.*${query.search}.*`, 'i') },
          { brand: new RegExp(`.*${query.search}.*`, 'i') },
        ],
      }),
    };

    const items = await this.lostItemModel
      .find(filters)
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    const total = await this.lostItemModel.countDocuments(filters);

    return {
      items: this.toJSONs(items, LostItemDto),
      pagination: {
        total,
        current: query.page,
        previous: query.page === 1 ? 1 : query.page - 1,
        next: total > query.page * query.pageSize ? query.page + 1 : query.page,
      },
    };
  }

  async findOne(userId: string, id: string) {
    const lostItem = await this.lostItemModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!lostItem) {
      throw new NotFoundException('Lost item not found');
    }

    return this.toJSON(lostItem, LostItemDto);
  }

  async updateOne(
    userId: string,
    id: string,
    updateLostItemDto: UpdateLostItemDto,
  ) {
    const lostItem = await this.lostItemModel.findOne({
      _id: id,
      createdBy: userId,
      isDeleted: false,
    });

    if (!lostItem) {
      throw new NotFoundException('Lost item not found');
    }

    const updatedLostItem = await this.lostItemModel.findByIdAndUpdate(
      id,
      { $set: updateLostItemDto },
      { new: true },
    );

    return this.toJSON(updatedLostItem, LostItemDto);
  }

  async updateStatus(
    userId: string,
    id: string,
    body: UpdateLostItemStatusDto,
  ) {
    const lostItem = await this.lostItemModel.findOne({
      _id: id,
      createdBy: userId,
      isDeleted: false,
    });

    if (!lostItem) {
      throw new NotFoundException('Lost item not found');
    }

    const updatedLostItem = await this.lostItemModel.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true },
    );

    return this.toJSON(updatedLostItem, LostItemDto);
  }

  async deleteOne(userId: string, id: string) {
    const lostItem = await this.lostItemModel.findOne({
      _id: id,
      createdBy: userId,
      isDeleted: false,
    });

    if (!lostItem) throw new NotFoundException('Lost item not found');

    lostItem.isDeleted = true;
    lostItem.isActive = false;
    await lostItem.save();

    return this.toJSON(lostItem, LostItemDto);
  }
}

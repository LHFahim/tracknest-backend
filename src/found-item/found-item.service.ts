import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';

import {
  CreateFoundItemDto,
  FoundItemDto,
  FoundItemPaginatedDto,
  FoundItemQueryDto,
  UpdateFoundItemDto,
  UpdateFoundItemStatusDto,
} from './dto/found-item.dto';
import {
  FoundItemEntity,
  FoundItemStatusEnum,
} from './entities/found-item.entity';

@Injectable()
export class FoundItemService extends SerializeService<FoundItemEntity> {
  constructor(
    @InjectModel(FoundItemEntity)
    private readonly foundItemModel: ReturnModelType<typeof FoundItemEntity>,
  ) {
    super(FoundItemEntity);
  }

  async create(userId: string, body: CreateFoundItemDto) {
    const foundItem = await this.foundItemModel.create({
      ...body,

      gpsLocation: body.gpsLocation
        ? {
            latitude: body.gpsLocation.latitude,
            longitude: body.gpsLocation.longitude,
          }
        : undefined,

      status: FoundItemStatusEnum.REPORTED,
      foundBy: userId,

      isPublic: true,
      isActive: true,
      isDeleted: false,
    });

    return this.toJSON(foundItem, FoundItemDto);
  }

  async findAll(
    userId: string,
    query: FoundItemQueryDto,
  ): Promise<FoundItemPaginatedDto> {
    const filters = {
      isDeleted: false,
      ...(query.search && {
        $or: [
          { title: new RegExp(`.*${query.search}.*`, 'i') },
          { description: new RegExp(`.*${query.search}.*`, 'i') },
          { locationFound: new RegExp(`.*${query.search}.*`, 'i') },
          { brand: new RegExp(`.*${query.search}.*`, 'i') },
          { identifyingDetails: new RegExp(`.*${query.search}.*`, 'i') },
        ],
      }),
    };

    const items = await this.foundItemModel
      .find(filters)
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    const total = await this.foundItemModel.countDocuments(filters);

    return {
      items: this.toJSONs(items, FoundItemDto),
      pagination: {
        total,
        current: query.page,
        previous: query.page === 1 ? 1 : query.page - 1,
        next: total > query.page * query.pageSize ? query.page + 1 : query.page,
      },
    };
  }

  async findOne(userId: string, id: string) {
    const foundItem = await this.foundItemModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!foundItem) throw new NotFoundException('Found item not found');

    return this.toJSON(foundItem, FoundItemDto);
  }

  async updateOne(userId: string, id: string, body: UpdateFoundItemDto) {
    const foundItem = await this.foundItemModel.findOne({
      _id: id,
      foundBy: userId,
      isDeleted: false,
    });

    if (!foundItem) {
      throw new NotFoundException('Found item not found');
    }

    const updatedFoundItem = await this.foundItemModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true },
    );

    return this.toJSON(updatedFoundItem, FoundItemDto);
  }

  async updateStatus(
    userId: string,
    id: string,
    body: UpdateFoundItemStatusDto,
  ) {
    const foundItem = await this.foundItemModel.findOne({
      _id: id,
      foundBy: userId,
      isDeleted: false,
    });

    if (!foundItem) {
      throw new NotFoundException('Found item not found');
    }

    const updatedFoundItem = await this.foundItemModel.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true },
    );

    return this.toJSON(updatedFoundItem, FoundItemDto);
  }

  async deleteOne(userId: string, id: string) {
    const foundItem = await this.foundItemModel.findOne({
      _id: id,
      foundBy: userId,
      isDeleted: false,
    });

    if (!foundItem) throw new NotFoundException('Found item not found');

    await this.foundItemModel.findByIdAndUpdate(id, {
      isDeleted: true,
      isActive: false,
    });

    return this.toJSON(foundItem, FoundItemDto);
  }
}

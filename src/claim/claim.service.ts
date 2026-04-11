import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  ClaimDto,
  ClaimPaginatedDto,
  ClaimQueryDto,
  CreateClaimDto,
} from './dto/claim.dto';
import { ClaimEntity, ClaimStatusEnum } from './entities/claim.entity';

@Injectable()
export class ClaimService extends SerializeService<ClaimEntity> {
  constructor(
    @InjectModel(ClaimEntity)
    private readonly claimModel: ReturnModelType<typeof ClaimEntity>,
  ) {
    super(ClaimEntity);
  }

  async create(userId: string, body: CreateClaimDto) {
    const claim = await this.claimModel.create({
      ...body,
      claimedBy: userId,

      status: ClaimStatusEnum.PENDING,
      isActive: true,
      isDeleted: false,
    });

    return this.toJSON(claim, ClaimDto);
  }

  async findAll(
    userId: string,
    query: ClaimQueryDto,
  ): Promise<ClaimPaginatedDto> {
    const filters = {
      claimedBy: userId,
      isDeleted: false,
      ...(query.search && {
        $or: [
          { message: new RegExp(`.*${query.search}.*`, 'i') },
          { reviewComment: new RegExp(`.*${query.search}.*`, 'i') },
        ],
      }),
    };

    const items = await this.claimModel
      .find(filters)
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    const total = await this.claimModel.countDocuments(filters);

    return {
      items: this.toJSONs(items, ClaimDto),
      pagination: {
        total,
        current: query.page,
        previous: query.page === 1 ? 1 : query.page - 1,
        next: total > query.page * query.pageSize ? query.page + 1 : query.page,
      },
    };
  }

  async findOne(userId: string, id: string) {
    const claim = await this.claimModel.findOne({
      _id: id,
      claimedBy: userId,
      isDeleted: false,
    });

    if (!claim) throw new NotFoundException('Claim not found');

    return this.toJSON(claim, ClaimDto);
  }

  async withdraw(userId: string, id: string): Promise<boolean> {
    const claim = await this.claimModel.findOne({
      _id: id,
      claimedBy: userId,
      isDeleted: false,
    });

    if (!claim) return false;

    await this.claimModel.findByIdAndUpdate(id, {
      isDeleted: true,
      isActive: false,
      status: ClaimStatusEnum.CANCELED,
    });

    return true;
  }
}

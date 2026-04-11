import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  ClaimDto,
  ClaimPaginatedDto,
  ClaimQueryDto,
} from 'src/claim/dto/claim.dto';
import { ClaimEntity, ClaimStatusEnum } from 'src/claim/entities/claim.entity';
import {
  FoundItemEntity,
  FoundItemStatusEnum,
} from 'src/found-item/entities/found-item.entity';
import { UpdateClaimDto } from './dto/admin-claim.dto';

@Injectable()
export class AdminClaimService extends SerializeService<ClaimEntity> {
  constructor(
    @InjectModel(ClaimEntity)
    private readonly claimModel: ReturnModelType<typeof ClaimEntity>,
    @InjectModel(FoundItemEntity)
    private readonly foundItemModel: ReturnModelType<typeof FoundItemEntity>,
  ) {
    super(ClaimEntity);
  }

  async findAll(
    userId: string,
    query: ClaimQueryDto,
  ): Promise<ClaimPaginatedDto> {
    const filters = {
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
      isDeleted: false,
    });

    if (!claim) throw new NotFoundException('Claim not found');

    return this.toJSON(claim, ClaimDto);
  }

  async updateStatus(userId: string, id: string, body: UpdateClaimDto) {
    const claim = await this.claimModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!claim) throw new NotFoundException('Claim not found');

    const updatedClaim = await this.claimModel.findByIdAndUpdate(
      id,
      {
        ...body,
        reviewedBy: userId,
        ...(body.status && { reviewDate: new Date() }),
      },
      { new: true },
    );

    await this.foundItemModel.findByIdAndUpdate(claim.foundItemId, {
      status: FoundItemStatusEnum.READY_FOR_HANDOVER,
    });

    // close other claim reports of the same item
    await this.claimModel.updateMany(
      {
        _id: { $ne: id },
        foundItemId: claim.foundItemId,
      },
      { isClosed: ClaimStatusEnum.REJECTED },
    );

    return this.toJSON(updatedClaim, ClaimDto);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { Prop, Ref } from '@typegoose/typegoose';
import { Expose, Transform } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';
import { FoundItemEntity } from 'src/found-item/entities/found-item.entity';
import { LostItemEntity } from 'src/lost-item/entities/lost-item.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export enum ClaimStatusEnum {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
}

@Model('claims', true)
export class ClaimEntity extends DocumentWithTimeStamps {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  message: string;

  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Transform(({ value }) => value?.toString())
  @Prop({ required: true, ref: () => FoundItemEntity })
  foundItemId: Ref<FoundItemEntity>;

  @Expose()
  @IsMongoId()
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => value?.toString())
  @Prop({ required: false, ref: () => LostItemEntity })
  lostItemId?: Ref<LostItemEntity>;

  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Transform(({ value }) => value?.toString())
  @Prop({ required: true, ref: () => UserEntity })
  claimedBy: Ref<UserEntity>;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  @IsArray({ each: true, message: 'Images must be an array of strings' })
  images: string[];

  @Expose()
  @IsMongoId()
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => value?.toString())
  @Prop({ required: false, ref: () => UserEntity })
  reviewedBy?: Ref<UserEntity>;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  reviewComment?: string;

  @Expose()
  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: true })
  @Prop({ required: true })
  reviewDate?: Date;

  @Expose()
  @IsNotEmpty()
  @IsEnum(ClaimStatusEnum)
  @ApiProperty({ required: true, enum: ClaimStatusEnum })
  @Prop({
    required: true,
    enum: ClaimStatusEnum,
    default: ClaimStatusEnum.PENDING,
  })
  status: ClaimStatusEnum;

  @Expose()
  @Prop({ required: false, type: Boolean, default: true })
  isActive: boolean;

  @Expose()
  @Prop({ required: false, type: Boolean, default: false })
  isDeleted: boolean;
}

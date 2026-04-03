import { ApiProperty } from '@nestjs/swagger';
import { ModelOptions, Prop, Ref } from '@typegoose/typegoose';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { Types } from 'mongoose';
import { CategoryEntity } from 'src/admin/admin-category/entities/admin-category.entity';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';

@ModelOptions({
  schemaOptions: {
    _id: false,
    id: false,
  },
})
export class GPSLocation {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true })
  latitude: number;

  @Expose()
  @IsString()
  @IsNumber()
  @ApiProperty({ required: true })
  @Prop({ required: true })
  longitude: number;
}

export enum LostItemStatusEnum {
  OPEN = 'OPEN',
  CLAIM_REQUESTED = 'CLAIM_REQUESTED',
  CLAIM_APPROVED = 'CLAIM_APPROVED',
  CLAIM_REJECTED = 'CLAIM_REJECTED',
  CLOSED = 'CLOSED',
}

@Model('lost-items', true)
export class LostItemEntity extends DocumentWithTimeStamps {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  title: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  description: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  locationLost: string;

  @Expose()
  @IsOptional()
  @Type(() => GPSLocation)
  @ApiProperty({ required: false })
  @Prop({ required: false, type: () => GPSLocation })
  gpsLocation: GPSLocation;

  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Transform(({ value }) => value?.toString())
  @Prop({ required: true, ref: () => CategoryEntity })
  category: Ref<CategoryEntity>;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  brand?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  color?: string;

  @Expose()
  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: true })
  @Prop({ required: true })
  dateLost: Date;

  @Expose()
  @IsNotEmpty()
  @IsEnum(LostItemStatusEnum)
  @ApiProperty({ required: true, enum: LostItemStatusEnum })
  @Prop({
    required: true,
    enum: LostItemStatusEnum,
    default: LostItemStatusEnum.OPEN,
  })
  status: LostItemStatusEnum;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  imageURL?: string;

  @Expose()
  @IsMongoId()
  @Type(() => String)
  @Prop({ required: true, ref: 'users' })
  @ApiProperty({ required: true, type: String })
  createdBy: Types.ObjectId;

  @Expose()
  @Prop({ required: false, type: Boolean, default: true })
  isActive: boolean;

  @Expose()
  @Prop({ required: false, type: Boolean, default: false })
  isDeleted: boolean;
}

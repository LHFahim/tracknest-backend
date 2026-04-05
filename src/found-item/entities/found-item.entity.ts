import { ApiProperty } from '@nestjs/swagger';
import { Prop, Ref } from '@typegoose/typegoose';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { Types } from 'mongoose';
import { CategoryEntity } from 'src/admin/admin-category/entities/admin-category.entity';
import { GPSLocation } from 'src/lost-item/entities/lost-item.entity';

export enum FoundItemCustodyTypeEnum {
  USER = 'USER',
  OFFICE = 'OFFICE',
}

export enum FoundItemStatusEnum {
  REPORTED = 'REPORTED',
  IN_CUSTODY = 'IN_CUSTODY',
  RETURNED = 'RETURNED',
  UNCLAIMED = 'UNCLAIMED',
  DISPOSED = 'DISPOSED',
}

@Model('found-items', true)
export class FoundItemEntity {
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
  dateFound: Date;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  locationFound: string;

  @Expose()
  @IsOptional()
  @Type(() => GPSLocation)
  @ApiProperty({ required: false })
  @Prop({ required: false, type: () => GPSLocation })
  gpsLocation: GPSLocation;

  @Expose()
  @IsNotEmpty()
  @IsEnum(FoundItemCustodyTypeEnum)
  @ApiProperty({
    required: true,
    enum: FoundItemCustodyTypeEnum,
    default: FoundItemCustodyTypeEnum.OFFICE,
  })
  @Prop({
    required: true,
    enum: FoundItemCustodyTypeEnum,
    default: FoundItemCustodyTypeEnum.OFFICE,
  })
  custodyType: FoundItemCustodyTypeEnum;

  @Expose()
  @IsNotEmpty()
  @IsEnum(FoundItemStatusEnum)
  @ApiProperty({
    required: true,
    enum: FoundItemStatusEnum,
    default: FoundItemStatusEnum.REPORTED,
  })
  @Prop({
    required: true,
    enum: FoundItemStatusEnum,
    default: FoundItemStatusEnum.REPORTED,
  })
  status: FoundItemStatusEnum;

  @Expose()
  @IsOptional()
  @ApiProperty({ required: false, type: [String], default: [] })
  @Prop({ required: false, type: [String], default: [] })
  images: string[];

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  identifyingDetails?: string;

  @Expose()
  @IsMongoId()
  @Type(() => String)
  @Prop({ required: true, ref: 'users' })
  @ApiProperty({ required: true, type: String })
  foundBy: Types.ObjectId;

  @Expose()
  @Prop({ required: false, type: Boolean, default: true })
  isPublic: boolean;

  @Expose()
  @Prop({ required: false, type: Boolean, default: true })
  isActive: boolean;

  @Expose()
  @Prop({ required: false, type: Boolean, default: false })
  isDeleted: boolean;
}

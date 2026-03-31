import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';
import { Expose, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';

export class GPSLocation {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  latitude: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  longitude: string;
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
  @Prop({ required: false, type: Boolean, default: true })
  isActive: boolean;

  @Expose()
  @Prop({ required: false, type: Boolean, default: false })
  isDeleted: boolean;
}

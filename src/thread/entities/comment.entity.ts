import { ApiProperty } from '@nestjs/swagger';
import { Prop, Ref } from '@typegoose/typegoose';
import { Expose, Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { ClaimEntity } from 'src/claim/entities/claim.entity';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';
import { UserEntity } from 'src/user/entities/user.entity';

export enum ClaimMessageSenderTypeEnum {
  USER = 'USER',

  STAFF = 'STAFF',
}

@Model('comments', true)
export class CommentEntity extends DocumentWithTimeStamps {
  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  @Transform(({ value }) => value?.toString())
  @Prop({ required: true, ref: () => ClaimEntity })
  claim: Ref<ClaimEntity>;

  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  @Transform(({ value }) => value?.toString())
  @Prop({ required: true, ref: () => UserEntity })
  sender: Ref<UserEntity>;

  @Expose()
  @IsEnum(ClaimMessageSenderTypeEnum)
  @IsNotEmpty()
  @ApiProperty({ required: true, enum: ClaimMessageSenderTypeEnum })
  @Prop({ required: true, enum: ClaimMessageSenderTypeEnum })
  senderType: ClaimMessageSenderTypeEnum;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  message: string;

  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ required: false, type: [String] })
  @Prop({ required: false, type: [String], default: [] })
  attachments?: string[];

  @Expose()
  @IsBoolean()
  @ApiProperty({ required: false, default: false })
  @Prop({ required: false, type: Boolean, default: false })
  isInternalNote: boolean; // only visible to admin/staff

  @Expose()
  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  @Prop({ required: false, type: Date, default: null })
  readByUserAt?: Date;

  @Expose()
  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  @Prop({ required: false, type: Date, default: null })
  readByAdminAt?: Date;

  @Expose()
  @Prop({ required: false, type: Boolean, default: true })
  isActive: boolean;

  @Expose()
  @Prop({ required: false, type: Boolean, default: false })
  isDeleted: boolean;
}

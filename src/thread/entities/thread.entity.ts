import { ApiProperty } from '@nestjs/swagger';
import { Prop, Ref } from '@typegoose/typegoose';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { ClaimEntity } from 'src/claim/entities/claim.entity';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';
import { CommentEntity } from './comment.entity';

export enum ThreadStatusEnum {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

@Model('threads', true)
export class ThreadEntity extends DocumentWithTimeStamps {
  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @Type(() => ClaimEntity)
  @Prop({ required: true, ref: () => ClaimEntity })
  claim: Ref<ClaimEntity>;

  @Expose()
  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty({ required: true })
  @Type(() => CommentEntity)
  @Prop({ required: true, ref: () => CommentEntity, default: [] })
  comments: Ref<CommentEntity>[];

  @Expose()
  @IsNotEmpty()
  @IsEnum(ThreadStatusEnum)
  @Prop({
    required: true,
    enum: ThreadStatusEnum,
    default: ThreadStatusEnum.OPEN,
  })
  @ApiProperty({
    required: true,
    enum: ThreadStatusEnum,
    default: ThreadStatusEnum.OPEN,
  })
  status: ThreadStatusEnum;

  @Expose()
  @Prop({ required: false, type: Boolean, default: true })
  isActive: boolean;

  @Expose()
  @Prop({ required: false, type: Boolean, default: false })
  isDeleted: boolean;
}

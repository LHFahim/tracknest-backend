import { ApiProperty } from '@nestjs/swagger';
import { Prop, Ref } from '@typegoose/typegoose';
import { Expose, Transform } from 'class-transformer';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';
import { FoundItemEntity } from 'src/found-item/entities/found-item.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Model('handovers', true)
export class HandoverEntity extends DocumentWithTimeStamps {
  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  @Transform(({ value }) => value?.toString())
  @Prop({ required: true, ref: () => FoundItemEntity })
  foundItem: Ref<FoundItemEntity>;

  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  @Transform(({ value }) => value?.toString())
  @Prop({ required: true, ref: () => UserEntity })
  receivedByUser: Ref<UserEntity>; // owner / normal user

  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  @Transform(({ value }) => value?.toString())
  @Prop({ required: true, ref: () => UserEntity })
  handedOverBy: Ref<UserEntity>; // staff member

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  verificationMethod?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  note?: string;

  @Expose()
  @IsDateString()
  @Prop({ required: true, default: Date.now })
  handedOverAt: Date;
}

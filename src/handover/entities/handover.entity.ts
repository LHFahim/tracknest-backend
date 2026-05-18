import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';
import { Expose } from 'class-transformer';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';

@Model('handovers', true)
export class HandoverEntity extends DocumentWithTimeStamps {
  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  @Prop({ required: true, type: String })
  foundItem: string;

  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  @Prop({ required: true, type: String })
  receivedByUser: string;

  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  @Prop({ required: true, type: String })
  handedOverBy: string;

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

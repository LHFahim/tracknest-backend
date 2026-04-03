import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';
import { Expose } from 'class-transformer';
import { IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';

@Model('categories', true)
export class CategoryEntity extends DocumentWithTimeStamps {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  name: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  description?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  icon?: string;

  @Expose()
  @IsString()
  @IsHexColor()
  @IsOptional()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  color?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  parentCategory?: string;

  @Expose()
  @Prop({ required: false, type: Boolean, default: true })
  isActive: boolean;

  @Expose()
  @Prop({ required: false, type: Boolean, default: false })
  isDeleted: boolean;
}

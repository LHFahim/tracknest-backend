import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LostItemEntity } from '../entities/lost-item.entity';

export class CreateLostItemDto extends PickType(LostItemEntity, [
  'title',
  'description',
  'locationLost',
  'gpsLocation',
  'brand',
  'color',
  'dateLost',
  'imageURL',
]) {
  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  category: string;
}

export class UpdateLostItemDto extends PartialType(CreateLostItemDto) {}

export class UpdateLostItemStatusDto extends PickType(LostItemEntity, [
  'status',
]) {}

export class LostItemDto extends LostItemEntity {}

export class LostItemQueryDto extends PaginationQueryDto {}

export class LostItemPaginatedDto {
  @Expose()
  items: LostItemDto[];

  @Expose()
  pagination: PaginationDto;
}

import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsString, Max, Min } from 'class-validator';

export class AIMatchResponseDto {
  @IsMongoId()
  foundItemId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsMongoId()
  category: string;

  @IsString()
  brand: string;

  @IsString()
  color: string;

  @IsString()
  locationFound: string;

  @Type(() => Date)
  @IsDate()
  dateFound: Date;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNumber()
  @Min(0)
  @Max(100)
  score: number;
}

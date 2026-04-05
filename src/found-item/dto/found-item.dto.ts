import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FoundItemEntity } from '../entities/found-item.entity';

export class CreateFoundItemDto extends PickType(FoundItemEntity, [
  'title',
  'description',
  'locationFound',
  'gpsLocation',
  'brand',
  'color',
  'dateFound',
  'custodyType',
  'images',
  'identifyingDetails',
]) {
  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  category: string;
}

export class UpdateFoundItemDto extends PartialType(CreateFoundItemDto) {}

export class UpdateFoundItemStatusDto extends PickType(FoundItemEntity, [
  'status',
]) {}

export class FoundItemDto extends FoundItemEntity {}

export class FoundItemQueryDto extends PaginationQueryDto {}

export class FoundItemPaginatedDto {
  @Expose()
  items: FoundItemDto[];

  @Expose()
  pagination: PaginationDto;
}

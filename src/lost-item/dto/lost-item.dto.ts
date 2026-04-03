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

export class LostItemDto extends LostItemEntity {}

export class LostItemQueryDto extends PaginationQueryDto {}

export class LostItemPaginatedDto {
  @Expose()
  items: LostItemDto[];

  @Expose()
  pagination: PaginationDto;
}

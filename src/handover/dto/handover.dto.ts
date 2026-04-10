import { PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { HandoverEntity } from '../entities/handover.entity';

export class CreateHandoverDto extends PickType(HandoverEntity, [
  'foundItem',
  'receivedByUser',
  'note',
]) {}

export class UpdateHandoverDto extends PartialType(CreateHandoverDto) {}

export class HandoverDto extends HandoverEntity {}

export class HandoverQueryDto extends PaginationQueryDto {}

export class HandoverPaginatedDto {
  @Expose()
  items: HandoverDto[];

  @Expose()
  pagination: PaginationDto;
}

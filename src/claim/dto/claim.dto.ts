import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ClaimEntity } from '../entities/claim.entity';

export class CreateClaimDto extends PickType(ClaimEntity, [
  'message',
  'images',
]) {
  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  foundItemId: string;
}

export class ClaimDto extends ClaimEntity {}

export class ClaimQueryDto extends PaginationQueryDto {}

export class ClaimPaginatedDto {
  @Expose()
  items: ClaimDto[];

  @Expose()
  pagination: PaginationDto;
}

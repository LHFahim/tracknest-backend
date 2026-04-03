import { PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CategoryEntity } from '../entities/admin-category.entity';

export class CreateCategoryDto extends PickType(CategoryEntity, [
  'name',
  'description',
  'color',
  'icon',
]) {}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class CategoryDto extends CategoryEntity {}

export class AdminCategoryQueryDto extends PaginationQueryDto {}

export class AdminCategoryPaginatedDto {
  @Expose()
  items: CategoryDto[];

  @Expose()
  pagination: PaginationDto;
}

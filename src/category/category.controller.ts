import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'libraries/serializer/serializer.decorator';
import { AdminCategoryQueryDto } from 'src/admin/admin-category/dto/admin-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Routes } from 'src/common/constant/routes';
import { ResourceId } from 'src/common/decorator/params.decorator';
import { UserId } from 'src/common/decorator/user.decorator';
import { APIVersions } from 'src/common/enum/api-versions.enum';
import { ControllersEnum } from 'src/common/enum/controllers.enum';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Serialize()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: ControllersEnum.Category, version: APIVersions.V1 })
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(Routes[ControllersEnum.Category].findAll)
  findAll(@UserId() userId: string, @Query() query: AdminCategoryQueryDto) {
    return this.categoryService.findAll(userId, query);
  }

  @Get(Routes[ControllersEnum.Category].findOne)
  findOne(@UserId() userId: string, @ResourceId() id: string) {
    return this.categoryService.findOne(userId, id);
  }
}

import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'libraries/serializer/serializer.decorator';
import { Routes } from 'src/common/constant/routes';
import { UserId } from 'src/common/decorator/user.decorator';
import { APIVersions } from 'src/common/enum/api-versions.enum';
import { ControllersEnum } from 'src/common/enum/controllers.enum';
import { AdminJwtAuthGuard } from '../admin-auth/admin-guards/admin-jwt-auth.guard';
import { AdminCategoryService } from './admin-category.service';
import {
  AdminCategoryQueryDto,
  CreateCategoryDto,
} from './dto/admin-category.dto';

@ApiTags('Admin -> category')
@Serialize()
@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard)
@Controller({ path: ControllersEnum.AdminCategory, version: APIVersions.V1 })
export class AdminCategoryController {
  constructor(private readonly categoryService: AdminCategoryService) {}

  @Get(Routes[ControllersEnum.Category].findAll)
  findAll(@UserId() userId: string, @Query() query: AdminCategoryQueryDto) {
    return this.categoryService.findAll(userId, query);
  }

  @Post(Routes[ControllersEnum.AdminCategory].createOne)
  createOne(
    @UserId() userId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.createOne(userId, createCategoryDto);
  }
}

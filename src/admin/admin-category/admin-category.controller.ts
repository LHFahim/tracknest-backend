import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'libraries/serializer/serializer.decorator';
import { Routes } from 'src/common/constant/routes';
import { ResourceId } from 'src/common/decorator/params.decorator';
import { UserId } from 'src/common/decorator/user.decorator';
import { APIVersions } from 'src/common/enum/api-versions.enum';
import { ControllersEnum } from 'src/common/enum/controllers.enum';
import { AdminJwtAuthGuard } from '../admin-auth/admin-guards/admin-jwt-auth.guard';
import { AdminCategoryService } from './admin-category.service';
import {
  AdminCategoryQueryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto/admin-category.dto';

@ApiTags('Admin -> category')
@Serialize()
@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard)
@Controller({ path: ControllersEnum.AdminCategory, version: APIVersions.V1 })
export class AdminCategoryController {
  constructor(private readonly adminCategoryService: AdminCategoryService) {}

  @Post(Routes[ControllersEnum.AdminCategory].createOne)
  createOne(
    @UserId() userId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.adminCategoryService.createOne(userId, createCategoryDto);
  }

  @Get(Routes[ControllersEnum.AdminCategory].findAll)
  findAll(@UserId() userId: string, @Query() query: AdminCategoryQueryDto) {
    return this.adminCategoryService.findAll(userId, query);
  }

  @Get(Routes[ControllersEnum.AdminCategory].findOne)
  findOne(@UserId() userId: string, @ResourceId() id: string) {
    return this.adminCategoryService.findOne(userId, id);
  }

  @Patch(Routes[ControllersEnum.AdminCategory].updateOne)
  updateOne(
    @UserId() userId: string,
    @ResourceId() id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.adminCategoryService.updateOne(userId, id, updateCategoryDto);
  }

  @Delete(Routes[ControllersEnum.AdminCategory].deleteOne)
  deleteOne(@UserId() userId: string, @ResourceId() id: string) {
    return this.adminCategoryService.deleteOne(userId, id);
  }
}

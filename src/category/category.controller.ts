import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'libraries/serializer/serializer.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Routes } from 'src/common/constant/routes';
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
  findAll() {
    return this.categoryService.findAll();
  }
}

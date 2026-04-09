import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
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
import {
  FoundItemQueryDto,
  UpdateFoundItemDto,
} from 'src/found-item/dto/found-item.dto';
import { AdminJwtAuthGuard } from '../admin-auth/admin-guards/admin-jwt-auth.guard';
import { AdminFoundItemService } from './admin-found-item.service';

@ApiTags('Admin -> Found Item')
@Serialize()
@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard)
@Controller({ path: ControllersEnum.AdminFoundItem, version: APIVersions.V1 })
export class AdminFoundItemController {
  constructor(private readonly foundItemService: AdminFoundItemService) {}

  @Get(Routes[ControllersEnum.AdminFoundItem].findAll)
  findAll(@UserId() userId: string, @Query() query: FoundItemQueryDto) {
    return this.foundItemService.findAll(userId, query);
  }

  @Get(Routes[ControllersEnum.AdminFoundItem].findOne)
  findOne(@UserId() userId: string, @ResourceId() id: string) {
    return this.foundItemService.findOne(userId, id);
  }

  @Patch(Routes[ControllersEnum.AdminFoundItem].updateOne)
  updateOne(
    @UserId() userId: string,
    @ResourceId() id: string,
    @Body() body: UpdateFoundItemDto,
  ) {
    return this.foundItemService.updateOne(userId, id, body);
  }

  @Delete(Routes[ControllersEnum.AdminFoundItem].deleteOne)
  deleteOne(@UserId() userId: string, @ResourceId() id: string) {
    return this.foundItemService.deleteOne(userId, id);
  }
}

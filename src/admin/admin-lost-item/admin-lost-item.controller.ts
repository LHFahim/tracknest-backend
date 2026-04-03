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
  LostItemQueryDto,
  UpdateLostItemDto,
} from 'src/lost-item/dto/lost-item.dto';
import { AdminJwtAuthGuard } from '../admin-auth/admin-guards/admin-jwt-auth.guard';
import { AdminLostItemService } from './admin-lost-item.service';

@ApiTags('Admin -> Lost Item')
@Serialize()
@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard)
@Controller({ path: ControllersEnum.AdminLostItem, version: APIVersions.V1 })
export class AdminLostItemController {
  constructor(private readonly lostItemService: AdminLostItemService) {}

  @Get(Routes[ControllersEnum.AdminLostItem].findAll)
  findAll(@UserId() userId: string, @Query() query: LostItemQueryDto) {
    return this.lostItemService.findAll(userId, query);
  }

  @Get(Routes[ControllersEnum.AdminLostItem].findOne)
  findOne(@UserId() userId: string, @ResourceId() id: string) {
    return this.lostItemService.findOne(userId, id);
  }

  @Patch(Routes[ControllersEnum.AdminLostItem].updateOne)
  updateOne(
    @UserId() userId: string,
    @ResourceId() id: string,
    @Body() updateLostItemDto: UpdateLostItemDto,
  ) {
    return this.lostItemService.updateOne(userId, id, updateLostItemDto);
  }

  @Delete(Routes[ControllersEnum.AdminLostItem].deleteOne)
  deleteOne(@UserId() userId: string, @ResourceId() id: string) {
    return this.lostItemService.deleteOne(userId, id);
  }
}

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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Routes } from 'src/common/constant/routes';
import { ResourceId } from 'src/common/decorator/params.decorator';
import { UserId } from 'src/common/decorator/user.decorator';
import { APIVersions } from 'src/common/enum/api-versions.enum';
import { ControllersEnum } from 'src/common/enum/controllers.enum';

import {
  CreateFoundItemDto,
  FoundItemQueryDto,
  UpdateFoundItemDto,
  UpdateFoundItemStatusDto,
} from './dto/found-item.dto';
import { FoundItemService } from './found-item.service';

@ApiTags('Found Item')
@Serialize()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: ControllersEnum.FoundItem, version: APIVersions.V1 })
export class FoundItemController {
  constructor(private readonly foundItemService: FoundItemService) {}

  @Post(Routes[ControllersEnum.FoundItem].create)
  create(@UserId() userId: string, @Body() body: CreateFoundItemDto) {
    return this.foundItemService.create(userId, body);
  }

  @Get(Routes[ControllersEnum.FoundItem].findAll)
  findAll(@UserId() userId: string, @Query() query: FoundItemQueryDto) {
    return this.foundItemService.findAll(userId, query);
  }

  @Get(Routes[ControllersEnum.FoundItem].findOne)
  findOne(@UserId() userId: string, @ResourceId() id: string) {
    return this.foundItemService.findOne(userId, id);
  }

  @Patch(Routes[ControllersEnum.FoundItem].updateOne)
  updateOne(
    @UserId() userId: string,
    @ResourceId() id: string,
    @Body() body: UpdateFoundItemDto,
  ) {
    return this.foundItemService.updateOne(userId, id, body);
  }

  @Patch(Routes[ControllersEnum.FoundItem].updateStatus)
  updateStatus(
    @UserId() userId: string,
    @ResourceId() id: string,
    @Body() body: UpdateFoundItemStatusDto,
  ) {
    return this.foundItemService.updateStatus(userId, id, body);
  }

  @Delete(Routes[ControllersEnum.FoundItem].deleteOne)
  deleteOne(@UserId() userId: string, @ResourceId() id: string) {
    return this.foundItemService.deleteOne(userId, id);
  }
}

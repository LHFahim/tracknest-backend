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
  CreateLostItemDto,
  LostItemQueryDto,
  UpdateLostItemDto,
  UpdateLostItemStatusDto,
} from './dto/lost-item.dto';
import { LostItemService } from './lost-item.service';

@ApiTags('Lost Item')
@Serialize()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: ControllersEnum.LostItem, version: APIVersions.V1 })
export class LostItemController {
  constructor(private readonly lostItemService: LostItemService) {}

  @Post(Routes[ControllersEnum.LostItem].create)
  create(
    @UserId() userId: string,
    @Body() createLostItemDto: CreateLostItemDto,
  ) {
    return this.lostItemService.create(userId, createLostItemDto);
  }

  @Get(Routes[ControllersEnum.LostItem].findAll)
  findAll(@UserId() userId: string, @Query() query: LostItemQueryDto) {
    return this.lostItemService.findAll(userId, query);
  }

  @Get(Routes[ControllersEnum.LostItem].findOne)
  findOne(@UserId() userId: string, @ResourceId() id: string) {
    return this.lostItemService.findOne(userId, id);
  }

  @Patch(Routes[ControllersEnum.LostItem].updateOne)
  updateOne(
    @UserId() userId: string,
    @ResourceId() id: string,
    @Body() updateLostItemDto: UpdateLostItemDto,
  ) {
    return this.lostItemService.updateOne(userId, id, updateLostItemDto);
  }

  @Patch(Routes[ControllersEnum.LostItem].updateStatus)
  updateStatus(
    @UserId() userId: string,
    @ResourceId() id: string,
    @Body() updateLostItemDto: UpdateLostItemStatusDto,
  ) {
    return this.lostItemService.updateStatus(userId, id, updateLostItemDto);
  }

  @Delete(Routes[ControllersEnum.LostItem].deleteOne)
  deleteOne(@UserId() userId: string, @ResourceId() id: string) {
    return this.lostItemService.deleteOne(userId, id);
  }
}

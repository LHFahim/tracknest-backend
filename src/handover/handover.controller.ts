import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'libraries/serializer/serializer.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Routes } from 'src/common/constant/routes';
import { ResourceId } from 'src/common/decorator/params.decorator';
import { UserId } from 'src/common/decorator/user.decorator';
import { APIVersions } from 'src/common/enum/api-versions.enum';
import { ControllersEnum } from 'src/common/enum/controllers.enum';
import { HandoverService } from './handover.service';
import { CreateHandoverDto, HandoverQueryDto } from './dto/handover.dto';

@ApiTags('Handover')
@Serialize()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: ControllersEnum.Handover, version: APIVersions.V1 })
export class HandoverController {
  constructor(private readonly handoverService: HandoverService) {}

  @Post(Routes[ControllersEnum.Handover].create)
  create(@UserId() userId: string, @Body() body: CreateHandoverDto) {
    return this.handoverService.create(userId, body);
  }

  @Get(Routes[ControllersEnum.Handover].findAll)
  findAll(@UserId() userId: string, @Query() query: HandoverQueryDto) {
    return this.handoverService.findAll(userId, query);
  }

  @Get(Routes[ControllersEnum.Handover].findOne)
  findOne(@UserId() userId: string, @ResourceId() id: string) {
    return this.handoverService.findOne(userId, id);
  }
}

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'libraries/serializer/serializer.decorator';
import { Routes } from 'src/common/constant/routes';
import { UserId } from 'src/common/decorator/user.decorator';
import { APIVersions } from 'src/common/enum/api-versions.enum';
import { ControllersEnum } from 'src/common/enum/controllers.enum';
import { CreateHandoverDto } from 'src/handover/dto/handover.dto';
import { AdminJwtAuthGuard } from '../admin-auth/admin-guards/admin-jwt-auth.guard';
import { AdminHandoverService } from './admin-handover.service';

@ApiTags('Admin -> Handover')
@Serialize()
@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard)
@Controller({ path: ControllersEnum.AdminHandover, version: APIVersions.V1 })
export class AdminHandoverController {
  constructor(private readonly adminHandoverService: AdminHandoverService) {}

  @Post(Routes[ControllersEnum.AdminHandover].createOne)
  createOne(@UserId() userId: string, @Body() body: CreateHandoverDto) {
    return this.adminHandoverService.createOne(userId, body);
  }
}

import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'libraries/serializer/serializer.decorator';
import { ClaimQueryDto } from 'src/claim/dto/claim.dto';
import { Routes } from 'src/common/constant/routes';
import { ResourceId } from 'src/common/decorator/params.decorator';
import { UserId } from 'src/common/decorator/user.decorator';
import { APIVersions } from 'src/common/enum/api-versions.enum';
import { ControllersEnum } from 'src/common/enum/controllers.enum';
import { AdminJwtAuthGuard } from '../admin-auth/admin-guards/admin-jwt-auth.guard';
import { AdminClaimService } from './admin-claim.service';
import { UpdateClaimDto } from './dto/admin-claim.dto';

@ApiTags('Admin -> Claim')
@Serialize()
@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard)
@Controller({ path: ControllersEnum.AdminClaim, version: APIVersions.V1 })
export class AdminClaimController {
  constructor(private readonly adminClaimService: AdminClaimService) {}

  @Get(Routes[ControllersEnum.AdminClaim].findAll)
  findAll(@UserId() userId: string, @Query() query: ClaimQueryDto) {
    return this.adminClaimService.findAll(userId, query);
  }

  @Get(Routes[ControllersEnum.AdminClaim].findOne)
  findOne(@UserId() userId: string, @ResourceId() id: string) {
    return this.adminClaimService.findOne(userId, id);
  }

  @Patch(Routes[ControllersEnum.AdminClaim].updateOne)
  updateOne(
    @UserId() userId: string,
    @ResourceId() id: string,
    @Body() body: UpdateClaimDto,
  ) {
    return this.adminClaimService.updateOne(userId, id, body);
  }
}

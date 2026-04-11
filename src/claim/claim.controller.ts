import {
  Body,
  Controller,
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
import { ClaimService } from './claim.service';
import { ClaimQueryDto, CreateClaimDto } from './dto/claim.dto';

@ApiTags('Claim')
@Serialize()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: ControllersEnum.Claim, version: APIVersions.V1 })
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Post(Routes[ControllersEnum.Claim].create)
  create(@UserId() userId: string, @Body() body: CreateClaimDto) {
    return this.claimService.create(userId, body);
  }

  @Get(Routes[ControllersEnum.Claim].findAll)
  findAll(@UserId() userId: string, @Query() query: ClaimQueryDto) {
    return this.claimService.findAll(userId, query);
  }

  @Get(Routes[ControllersEnum.Claim].findOne)
  findOne(@UserId() userId: string, @ResourceId() id: string) {
    return this.claimService.findOne(userId, id);
  }

  @Patch(Routes[ControllersEnum.Claim].withdraw)
  withdraw(@UserId() userId: string, @ResourceId() id: string) {
    return this.claimService.withdraw(userId, id);
  }
}

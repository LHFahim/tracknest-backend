import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ClaimEntity } from 'src/claim/entities/claim.entity';
import { AdminClaimController } from './admin-claim.controller';
import { AdminClaimService } from './admin-claim.service';

@Module({
  imports: [TypegooseModule.forFeature([ClaimEntity])],
  controllers: [AdminClaimController],
  providers: [AdminClaimService],
})
export class AdminClaimModule {}

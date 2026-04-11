import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ClaimEntity } from 'src/claim/entities/claim.entity';
import { FoundItemEntity } from 'src/found-item/entities/found-item.entity';
import { AdminClaimController } from './admin-claim.controller';
import { AdminClaimService } from './admin-claim.service';

@Module({
  imports: [TypegooseModule.forFeature([ClaimEntity, FoundItemEntity])],
  controllers: [AdminClaimController],
  providers: [AdminClaimService],
})
export class AdminClaimModule {}

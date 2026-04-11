import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';
import { ClaimEntity } from './entities/claim.entity';

@Module({
  imports: [TypegooseModule.forFeature([ClaimEntity])],
  controllers: [ClaimController],
  providers: [ClaimService],
})
export class ClaimModule {}

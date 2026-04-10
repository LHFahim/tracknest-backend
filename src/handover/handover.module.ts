import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { HandoverService } from './handover.service';
import { HandoverController } from './handover.controller';
import { HandoverEntity } from './entities/handover.entity';

@Module({
  imports: [TypegooseModule.forFeature([HandoverEntity])],
  controllers: [HandoverController],
  providers: [HandoverService],
})
export class HandoverModule {}

import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { HandoverEntity } from 'src/handover/entities/handover.entity';
import { AdminHandoverController } from './admin-handover.controller';
import { AdminHandoverService } from './admin-handover.service';

@Module({
  imports: [TypegooseModule.forFeature([HandoverEntity])],
  controllers: [AdminHandoverController],
  providers: [AdminHandoverService],
})
export class AdminHandoverModule {}

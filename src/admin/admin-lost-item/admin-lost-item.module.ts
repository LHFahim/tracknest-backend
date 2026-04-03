import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { LostItemEntity } from 'src/lost-item/entities/lost-item.entity';
import { AdminLostItemController } from './admin-lost-item.controller';
import { AdminLostItemService } from './admin-lost-item.service';

@Module({
  imports: [TypegooseModule.forFeature([LostItemEntity])],
  controllers: [AdminLostItemController],
  providers: [AdminLostItemService],
})
export class AdminLostItemModule {}

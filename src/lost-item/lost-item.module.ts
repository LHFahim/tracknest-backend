import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { LostItemService } from './lost-item.service';
import { LostItemController } from './lost-item.controller';
import { LostItemEntity } from './entities/lost-item.entity';

@Module({
  imports: [TypegooseModule.forFeature([LostItemEntity])],
  controllers: [LostItemController],
  providers: [LostItemService],
})
export class LostItemModule {}

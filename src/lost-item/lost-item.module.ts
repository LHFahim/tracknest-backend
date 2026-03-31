import { Module } from '@nestjs/common';
import { LostItemService } from './lost-item.service';
import { LostItemController } from './lost-item.controller';

@Module({
  controllers: [LostItemController],
  providers: [LostItemService],
})
export class LostItemModule {}

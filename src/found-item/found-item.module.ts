import { Module } from '@nestjs/common';
import { FoundItemService } from './found-item.service';
import { FoundItemController } from './found-item.controller';

@Module({
  controllers: [FoundItemController],
  providers: [FoundItemService],
})
export class FoundItemModule {}

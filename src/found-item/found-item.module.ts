import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { FoundItemService } from './found-item.service';
import { FoundItemController } from './found-item.controller';
import { FoundItemEntity } from './entities/found-item.entity';

@Module({
  imports: [TypegooseModule.forFeature([FoundItemEntity])],
  controllers: [FoundItemController],
  providers: [FoundItemService],
})
export class FoundItemModule {}

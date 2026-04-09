import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { FoundItemEntity } from 'src/found-item/entities/found-item.entity';
import { AdminFoundItemController } from './admin-found-item.controller';
import { AdminFoundItemService } from './admin-found-item.service';

@Module({
  imports: [TypegooseModule.forFeature([FoundItemEntity])],
  controllers: [AdminFoundItemController],
  providers: [AdminFoundItemService],
})
export class AdminFoundItemModule {}

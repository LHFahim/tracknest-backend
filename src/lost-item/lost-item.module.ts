import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { FoundItemEntity } from 'src/found-item/entities/found-item.entity';
import { AiMatcherModule } from './../ai-matcher/ai-matcher.module';
import { LostItemEntity } from './entities/lost-item.entity';
import { LostItemController } from './lost-item.controller';
import { LostItemService } from './lost-item.service';

@Module({
  imports: [
    TypegooseModule.forFeature([LostItemEntity, FoundItemEntity]),
    AiMatcherModule,
  ],
  controllers: [LostItemController],
  providers: [LostItemService],
})
export class LostItemModule {}

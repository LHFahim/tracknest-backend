import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AiMatcherModule } from 'src/ai-matcher/ai-matcher.module';
import { FoundItemEntity } from './entities/found-item.entity';
import { FoundItemController } from './found-item.controller';
import { FoundItemService } from './found-item.service';

@Module({
  imports: [TypegooseModule.forFeature([FoundItemEntity]), AiMatcherModule],
  controllers: [FoundItemController],
  providers: [FoundItemService],
})
export class FoundItemModule {}

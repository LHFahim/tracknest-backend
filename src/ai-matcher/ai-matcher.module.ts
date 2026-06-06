import { Module } from '@nestjs/common';
import { AiMatcherController } from './ai-matcher.controller';
import { AiMatcherService } from './ai-matcher.service';
import { GeminiEmbeddingService } from './GeminiEmbeddingService';

@Module({
  controllers: [AiMatcherController],
  providers: [AiMatcherService, GeminiEmbeddingService],
  exports: [AiMatcherService, GeminiEmbeddingService],
})
export class AiMatcherModule {}

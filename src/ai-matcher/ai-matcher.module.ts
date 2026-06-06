import { Module } from '@nestjs/common';
import { AiMatcherController } from './ai-matcher.controller';
import { AiMatcherService } from './services/ai-matcher.service';
import { GeminiEmbeddingService } from './services/gemini-embedding.service';
import { GeminiVisionService } from './services/gemini-vision.service';

@Module({
  controllers: [AiMatcherController],
  providers: [AiMatcherService, GeminiEmbeddingService, GeminiVisionService],
  exports: [AiMatcherService, GeminiEmbeddingService, GeminiVisionService],
})
export class AiMatcherModule {}

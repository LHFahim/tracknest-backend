import { Module } from '@nestjs/common';
import { AiMatcherController } from './ai-matcher.controller';
import { AiMatcherService } from './services/ai-matcher.service';
import { GeminiVisionService } from './services/gemini-vision.service';
import { GeminiEmbeddingService } from './services/GeminiEmbeddingService';

@Module({
  controllers: [AiMatcherController],
  providers: [AiMatcherService, GeminiEmbeddingService, GeminiVisionService],
  exports: [AiMatcherService, GeminiEmbeddingService, GeminiVisionService],
})
export class AiMatcherModule {}

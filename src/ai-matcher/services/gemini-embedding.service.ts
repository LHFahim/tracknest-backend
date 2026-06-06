import { GoogleGenAI } from '@google/genai';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class GeminiEmbeddingService {
  private readonly ai: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.GEMINI_API_KEY;

    if (!apiKey)
      throw new InternalServerErrorException('GEMINI_API_KEY is missing');

    this.ai = new GoogleGenAI({ apiKey });
  }

  async createEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: text,
        config: {
          taskType: 'SEMANTIC_SIMILARITY',
        },
      });

      const embedding = response.embeddings?.[0]?.values;

      if (!embedding) throw new Error('No embedding returned from Gemini');

      return embedding;
    } catch (error) {
      console.error('Gemini embedding error:', error);
      throw new InternalServerErrorException('Failed to create item embedding');
    }
  }
}

import { GoogleGenAI } from '@google/genai';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class GeminiVisionService {
  private readonly ai: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.GEMINI_API_KEY;

    if (!apiKey) throw new BadRequestException('GEMINI_API_KEY is missing');

    this.ai = new GoogleGenAI({ apiKey });
  }

  async describeImageFromUrl(imageUrl: string): Promise<string> {
    if (!imageUrl) {
      return '';
    }

    try {
      const imageResponse = await fetch(imageUrl);

      if (!imageResponse.ok) {
        throw new BadRequestException('Could not fetch image URL');
      }

      const contentType =
        imageResponse.headers.get('content-type') || 'image/jpeg';

      if (!contentType.startsWith('image/')) {
        throw new BadRequestException('URL does not point to an image');
      }

      const imageArrayBuffer = await imageResponse.arrayBuffer();
      const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');

      const result = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            inlineData: {
              mimeType: contentType,
              data: base64ImageData,
            },
          },
          {
            text: `Describe this lost-and-found item image in one short sentence. Focus only on object type, brand/logo if visible, color, shape, and unique visual features. Do not identify people.`.trim(),
          },
        ],
      });

      return result.text?.trim() || '';
    } catch (error) {
      console.error('Gemini vision error:', error);
      throw new InternalServerErrorException('Failed to describe image');
    }
  }
}

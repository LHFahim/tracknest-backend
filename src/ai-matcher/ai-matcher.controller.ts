import { Controller } from '@nestjs/common';
import { AiMatcherService } from './services/ai-matcher.service';

@Controller('ai-matcher')
export class AiMatcherController {
  constructor(private readonly aiMatcherService: AiMatcherService) {}
}

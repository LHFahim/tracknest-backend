import { Controller } from '@nestjs/common';
import { AiMatcherService } from './ai-matcher.service';

@Controller('ai-matcher')
export class AiMatcherController {
  constructor(private readonly aiMatcherService: AiMatcherService) {}
}

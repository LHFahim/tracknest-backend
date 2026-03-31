import { PartialType } from '@nestjs/swagger';
import { CreateLostItemDto } from './create-lost-item.dto';

export class UpdateLostItemDto extends PartialType(CreateLostItemDto) {}

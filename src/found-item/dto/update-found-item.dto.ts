import { PartialType } from '@nestjs/swagger';
import { CreateFoundItemDto } from './create-found-item.dto';

export class UpdateFoundItemDto extends PartialType(CreateFoundItemDto) {}

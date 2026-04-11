import { PartialType, PickType } from '@nestjs/swagger';
import { ClaimEntity } from 'src/claim/entities/claim.entity';

export class UpdateClaimDto extends PartialType(
  PickType(ClaimEntity, ['status', 'reviewComment']),
) {}

import { Test, TestingModule } from '@nestjs/testing';
import { LostItemService } from './lost-item.service';

describe('LostItemService', () => {
  let service: LostItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LostItemService],
    }).compile();

    service = module.get<LostItemService>(LostItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

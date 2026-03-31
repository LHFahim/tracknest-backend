import { Test, TestingModule } from '@nestjs/testing';
import { LostItemController } from './lost-item.controller';
import { LostItemService } from './lost-item.service';

describe('LostItemController', () => {
  let controller: LostItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LostItemController],
      providers: [LostItemService],
    }).compile();

    controller = module.get<LostItemController>(LostItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

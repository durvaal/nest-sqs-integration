import { Test, TestingModule } from '@nestjs/testing';
import { SqsManagerController } from './sqs-manager.controller';

describe('SqsManagerController', () => {
  let controller: SqsManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SqsManagerController],
    }).compile();

    controller = module.get<SqsManagerController>(SqsManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

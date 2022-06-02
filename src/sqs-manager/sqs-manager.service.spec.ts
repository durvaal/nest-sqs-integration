import { Test, TestingModule } from '@nestjs/testing';
import { SqsManagerService } from './sqs-manager.service';

describe('SqsManagerService', () => {
  let service: SqsManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqsManagerService],
    }).compile();

    service = module.get<SqsManagerService>(SqsManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

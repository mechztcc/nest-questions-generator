import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service';

describe('QuestionsService', () => {
  let provider: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsService],
    }).compile();

    provider = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

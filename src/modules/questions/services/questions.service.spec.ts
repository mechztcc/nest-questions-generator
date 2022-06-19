import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'mongoose';
import { Question } from '../schemas/question.schema';
import { QuestionsService } from './questions.service';

describe('QuestionsService', () => {
  let provider: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        { provide: getModelToken(Question.name), useValue: {} },
        { provide: getRepositoryToken(Question), useValue: {} },
      ],
    }).compile();

    provider = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should be return a question by _id', () => {
    
  })
});

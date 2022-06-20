import { HttpException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Model } from 'mongoose';
import { Repository } from 'typeorm';
import { Question, QuestionDocument } from '../schemas/question.schema';
import { QuestionsService } from './questions.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
});

describe('QuestionsService', () => {
  let provider: QuestionsService;
  let questionsRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: getModelToken(Question.name),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Question),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    provider = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should be return a HttpException with status 404 when try to find a question by nonexists _id', async () => {
    const _id: string = '62ac79c5971b06bd03211d06';
    const question = await provider.findById(_id);

    expect(question).toThrowError('Question not found');
  });
});

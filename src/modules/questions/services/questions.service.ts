import { HttpException, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from '../dtos/create-question-dto';
import { FindQuestionsByTagDto } from '../dtos/find-questions-by-tag-dto';
import { Question, QuestionDocument } from '../schemas/question.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  @Post()
  async create(payload: CreateQuestionDto): Promise<Question> {
    const question = new this.questionModel(payload);

    return question.save();
  }

  async index(page: number = 0): Promise<Question[]> {
    const limit: number = 10;

    const questions = this.questionModel
      .find()
      .skip(page * limit)
      .limit(limit);

    return questions;
  }

  async findById(_id: string): Promise<Question> {
    const question = await this.questionModel.findById(_id);
    if (!question) {
      throw new HttpException('Question not found', 404);
    }
    return question;
  }

  async findByTags(
    payload: FindQuestionsByTagDto,
    page: number = 0,
  ): Promise<Question[]> {
    const limit = 10;
    const questions = await this.questionModel
      .find({
        tags: { $in: payload.tags },
      })
      .skip(page * limit)
      .limit(10);

    return questions;
  }
}

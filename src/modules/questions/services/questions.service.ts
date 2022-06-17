import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from '../dtos/create-question-dto';
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

  async index(): Promise<Question[]> {
    const questions = this.questionModel.find().exec();
    return questions;
  }
}

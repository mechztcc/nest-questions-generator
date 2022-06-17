import { Injectable, Post } from '@nestjs/common';
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

  async index(): Promise<Question[]> {
    const questions = this.questionModel.find().exec();
    return questions;
  }

  async findById(_id: string): Promise<Question> {
    const question = this.questionModel.findById(_id);
    return question;
  }

  async findByTags(payload: FindQuestionsByTagDto): Promise<Question[]> {
    const questions = await this.questionModel.find({
      tags: { $in: payload.tags },
    });

    return questions;
  }
}

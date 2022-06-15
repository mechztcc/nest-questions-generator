import { Module } from '@nestjs/common';
import { QuestionsController } from './controllers/questions.controller';

@Module({
  controllers: [QuestionsController]
})
export class QuestionsModule { }

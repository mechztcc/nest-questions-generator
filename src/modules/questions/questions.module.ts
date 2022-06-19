import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsController } from './controllers/questions.controller';
import { Question, QuestionSchema } from './schemas/question.schema';
import { QuestionsService } from './services/questions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService, QuestionsController]
})
export class QuestionsModule {}

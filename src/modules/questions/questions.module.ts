import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UsersSchema } from '../users/schemas/user.schema';
import { UsersService } from '../users/services/users.service';
import { QuestionsController } from './controllers/questions.controller';
import { Question, QuestionSchema } from './schemas/question.schema';
import { QuestionsService } from './services/questions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      {
        name: 'User',
        schema: UsersSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, UsersService],
})
export class QuestionsModule {}

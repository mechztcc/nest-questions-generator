import { Body, Controller, Post } from '@nestjs/common';
import { CreateQuestionDto } from '../dtos/create-question-dto';
import { QuestionsService } from '../services/questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Post()
  create(@Body() payload: CreateQuestionDto) {
    return this.questionsService.create(payload);
  }
}

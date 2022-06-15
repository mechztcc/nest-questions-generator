import { Controller, Post } from '@nestjs/common';

@Controller('questions')
export class QuestionsController {
  @Post()
  create() {}
}

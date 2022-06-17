import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateQuestionDto } from '../dtos/create-question-dto';
import { FindQuestionsByTagDto } from '../dtos/find-questions-by-tag-dto';
import { QuestionsService } from '../services/questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Post()
  create(@Body() payload: CreateQuestionDto) {
    return this.questionsService.create(payload);
  }

  @Get()
  index() {
    return this.questionsService.index();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.questionsService.findById(id);
  }

  @Post('/tags')
  findByTags(@Body() payload: FindQuestionsByTagDto, @Query() query: any) {

    return this.questionsService.findByTags(payload, Number(query.page));
  }
}

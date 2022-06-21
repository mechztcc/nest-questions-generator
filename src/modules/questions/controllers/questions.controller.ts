import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateQuestionDto } from '../dtos/create-question-dto';
import { FindQuestionsByTagDto } from '../dtos/find-questions-by-tag-dto';
import { QuestionsService } from '../services/questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() payload: CreateQuestionDto) {
    return this.questionsService.create(payload);
  }

  @Get()
  index(@Query() query: any) {
    return this.questionsService.index(query.page);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.questionsService.findById(id);
  }

  @Post('/tags')
  findByTags(@Body() payload: FindQuestionsByTagDto, @Query() query: any) {
    return this.questionsService.findByTags(payload, Number(query.page));
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() response) {
    await this.questionsService.delete(id);

    return response
      .status(HttpStatus.ACCEPTED)
      .json({ message: `Question with _id: ${id} has been deleted.` });
  }
}

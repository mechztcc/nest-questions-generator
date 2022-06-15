import { Injectable, Post } from '@nestjs/common';

@Injectable()
export class QuestionsService {
  @Post()
  async create(payload: any) {
    return payload;
  }
}

import { IsArray } from 'class-validator';

export class FindQuestionsByTagDto {
  @IsArray()
  tags: string[];
}

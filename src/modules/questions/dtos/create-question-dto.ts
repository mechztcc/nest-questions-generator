import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  description: string;

  @IsNumber()
  answer: number;

  @IsArray()
  alternatives: string[];
}

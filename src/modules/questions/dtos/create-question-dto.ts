import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  description: string;

  @IsArray()
  tags: string[];

  @IsNumber()
  answer: number;

  @IsArray()
  alternatives: string[];

  @IsString()
  userId: string;
}

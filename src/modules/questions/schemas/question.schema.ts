import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop()
  description: string;

  @Prop()
  tags: string[];

  @Prop()
  answer: number;

  @Prop()
  alternatives: string[];

  @Prop()
  userId: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

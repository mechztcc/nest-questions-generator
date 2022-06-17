import { QuestionSchema } from './question.schema';

describe('QuestionSchema', () => {
  it('should be defined', () => {
    expect(new QuestionSchema()).toBeDefined();
  });
});

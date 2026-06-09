import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';

/**
 * Common handler for quiz question form submissions.
 * Used by all question type forms to return the created/edited question data.
 */
export type QuestionSubmitHandler<T extends QuizQuestion = QuizQuestion> = (
  data: T
) => void;

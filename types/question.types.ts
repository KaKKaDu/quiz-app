import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { QuizMistake } from '@/schemas/zod/quiz-results.zod';

/**
 * Common handler for quiz question form submissions.
 * Used by all question type forms to return the created/edited question data.
 */
export type QuestionSubmitHandler<T extends QuizQuestion = QuizQuestion> = (
  data: T
) => void;

/**
 * Unified validation result returned by question view components.
 */
export type ValidationResult = {
  correctness: number; // 0 to 1
  mistakes: QuizMistake[];
};

/**
 * Callback type for question validation.
 */
export type ValidationHandler = (result: ValidationResult) => void;

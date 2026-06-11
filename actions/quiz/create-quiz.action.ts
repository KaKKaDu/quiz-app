'use server';

import { getQuizService } from '@/services/quiz';
import { getQuizQuestionService } from '@/services/quiz-question';
import { SuccessDataAny, handleError } from '@/lib/errors';
import { Logger } from '@/lib/logger';
import { Quiz } from '@/schemas/zod/quiz.zod';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { QuizFormValues } from '@/schemas/zod/quiz-form.zod';

import { generateId } from '@/lib/utils/generate-id';

/**
 * Server action to create a full quiz including its questions.
 * Orchestrates QuizQuestionService and QuizService.
 */
export const createQuizAction = async (
  formData: QuizFormValues,
  questions: QuizQuestion[]
): Promise<SuccessDataAny<{ quizId: string }>> => {
  const context = 'createQuizAction';
  try {
    const quizService = getQuizService();
    const questionService = getQuizQuestionService();

    // 1. Save all questions
    const questionResult = await questionService.createQuestions(questions);

    if (!questionResult.success) {
      return questionResult as unknown as SuccessDataAny<{ quizId: string }>;
    }

    // 2. Prepare the quiz object
    const quizId = generateId();
    const quiz: Quiz = {
      id: quizId,
      name: formData.name,
      author: formData.author,
      description: formData.description,
      questionIds: questions.map((q) => q.id),
      resultIds: [], // Results are empty for a new quiz
    };

    // 3. Save the quiz
    const quizResult = await quizService.createQuiz(quiz);

    if (!quizResult.success) {
      // Note: Ideally we'd rollback questions here
      return quizResult as unknown as SuccessDataAny<{ quizId: string }>;
    }

    const result: SuccessDataAny<{ quizId: string }> = {
      success: true,
      data: { quizId },
    };

    Logger.report(context, result);
    return result;
  } catch (error) {
    const failedResult = handleError<{ quizId: string }>(error);
    Logger.report(context, failedResult);
    return failedResult;
  }
};

'use server';

import { getQuizService } from '@/services/quiz';
import { SuccessDataAny, handleError } from '@/lib/errors';
import { Logger } from '@/lib/logger';
import { QuizResults, QuizMistake } from '@/schemas/zod/quiz-results.zod';
import { generateId } from '@/lib/utils/generate-id';

/**
 * Server action to submit a participant's quiz result.
 * Orchestrates result creation and quiz association via QuizService.
 */
export const submitQuizResultAction = async (
  quizId: string,
  participantName: string,
  score: number,
  mistakes: QuizMistake[]
): Promise<SuccessDataAny<{ resultId: string }>> => {
  const context = 'submitQuizResultAction';
  try {
    const quizService = getQuizService();

    // 1. Prepare the results object
    const resultId = generateId();
    const results: QuizResults = {
      id: resultId,
      quizId,
      participantName,
      score,
      mistakes,
    };

    // 2. Add the result to the database and update the quiz
    const actionResult = await quizService.addQuizResult(quizId, results);

    if (!actionResult.success) {
      return actionResult as unknown as SuccessDataAny<{ resultId: string }>;
    }

    const result: SuccessDataAny<{ resultId: string }> = {
      success: true,
      data: { resultId },
    };

    Logger.report(context, result);
    return result;
  } catch (error) {
    const failedResult = handleError<{ resultId: string }>(error);
    Logger.report(context, failedResult);
    return failedResult;
  }
};

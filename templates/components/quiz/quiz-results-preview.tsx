import { QuizResults } from '@/schemas/zod/quiz-results.zod';
import { getCorrectnessColor } from '@/lib/utils/color.utils';
import { cn } from '@/lib/utils/cn';

type QuizResultsPreviewProps = {
  results: QuizResults[];
};

const QuizResultsPreview = ({ results }: QuizResultsPreviewProps) => {
  return (
    <div className={'flex flex-col gap-2 w-full'}>
      {results.map((result) => (
        <div
          key={result.id}
          style={{
            borderColor: getCorrectnessColor(result.score),
          }}
          className={cn(
            'flex flex-row justify-between items-center p-4',
            'border-[0.125rem]'
          )}
        >
          <span className={'text-lg font-medium text-foreground'}>
            {result.participantName}
          </span>
          <span
            style={{
              color: getCorrectnessColor(result.score),
            }}
            className={'text-xl font-extrabold'}
          >
            {result.score.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default QuizResultsPreview;

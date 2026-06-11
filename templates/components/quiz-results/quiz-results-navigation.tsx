'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';

type QuizResultsNavigationProps = {
  quizId: string;
};

const QuizResultsNavigation = ({ quizId }: QuizResultsNavigationProps) => {
  const domain: string = useMemo(() => {
    return `/quiz/${quizId}`;
  }, [quizId]);

  return (
    <div className={'flex w-full justify-end'}>
      <Link href={domain} className={'text-sm font-medium text-foreground'}>
        Go to Quiz <ArrowRightIcon weight="bold" className={'inline-block'} />
      </Link>
    </div>
  );
};

export default QuizResultsNavigation;

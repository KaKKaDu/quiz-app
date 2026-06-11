'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';

type QuizSectionNavigationProps = {
  quizId: string;
};

const QuizSectionNavigation = ({ quizId }: QuizSectionNavigationProps) => {
  const domain: string = useMemo(() => {
    return `/quiz/${quizId}/review`;
  }, [quizId]);

  return (
    <div className={'flex w-full justify-end'}>
      <Link href={domain} className={'text-sm font-medium text-foreground'}>
        Go to Quiz Results{' '}
        <ArrowRightIcon weight="bold" className={'inline-block'} />
      </Link>
    </div>
  );
};

export default QuizSectionNavigation;

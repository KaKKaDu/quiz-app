import { MetadataFactory } from '@/types/common.types';

/**
 * Metadata factory for the Create Quiz page.
 */
export const getCreateMetadata: MetadataFactory = async () => {
  return {
    title: 'Create Quiz | QuizApp',
    description: 'Start building your own minimalist quiz on QuizApp.',
    openGraph: {
      title: 'Create your own Quiz | QuizApp',
      description:
        'The easiest way to build a minimalist quiz for your friends.',
      type: 'website',
    },
  };
};

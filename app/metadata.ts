import { MetadataFactory } from '@/types/common.types';

/**
 * Metadata factory for the Home page.
 */
export const getHomeMetadata: MetadataFactory = async () => {
  return {
    title: 'QuizApp | Create and Share Quizzes',
    description:
      'The minimalist platform for creating and sharing quizzes with your friends.',
    openGraph: {
      title: 'QuizApp | Minimalist Quiz Platform',
      description:
        'Create and share minimalist quizzes effortlessly with your friends.',
      type: 'website',
      siteName: 'QuizApp',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'QuizApp',
      description: 'The minimalist platform for quizzes.',
    },
  };
};

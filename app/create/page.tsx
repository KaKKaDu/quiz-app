import { Metadata } from 'next';
import { CreateQuizSection } from '@/templates/sections/create-page/create-quiz.section';
import { getCreateMetadata } from './metadata';

export const generateMetadata = async (): Promise<Metadata> =>
  getCreateMetadata({});

export default function CreateQuizPage() {
  return <CreateQuizSection />;
}

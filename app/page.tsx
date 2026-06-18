import { Metadata } from 'next';
import { HeroSection } from '@/templates/sections/home-page/hero.section';
import { getHomeMetadata } from './metadata';

export const generateMetadata = async (): Promise<Metadata> =>
  getHomeMetadata({});

export default function Home() {
  return <HeroSection />;
}

import React from 'react';
import Link from 'next/link';
import { Button } from '@/templates/components/ui/button';
import { ArrowRightIcon } from '@phosphor-icons/react';

/**
 * Navigation component for the Hero section.
 * Encapsulates the primary call-to-action link.
 */
export const HeroNavigation = () => {
  return (
    <Button asChild size="lg">
      <Link href="/create" className="flex items-center gap-2">
        Create Quiz
        <ArrowRightIcon weight="bold" />
      </Link>
    </Button>
  );
};

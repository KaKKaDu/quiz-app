import React from 'react';
import Link from 'next/link';
import { Button } from '@/templates/components/ui/button';
import { HouseIcon } from '@phosphor-icons/react/ssr';

/**
 * Navigation component for the 404 page.
 * Encapsulates the link back to the home page.
 */
export const NotFoundNavigation = () => {
  return (
    <Button asChild size="lg" variant="outline">
      <Link href="/" className="flex items-center gap-2">
        <HouseIcon weight="bold" />
        Back to Home
      </Link>
    </Button>
  );
};

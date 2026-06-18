'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';

import { Button } from '@/templates/components/ui/button';

/**
 * ThemeToggle component that allows users to switch between light and dark themes.
 * Uses Phosphor icons and adheres to minimalistic monochrome standards.
 */
export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <div className="size-4" />
      </Button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <SunIcon className="size-4" weight="regular" />
      ) : (
        <MoonIcon className="size-4" weight="regular" />
      )}
    </Button>
  );
}

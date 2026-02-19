'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-md transition-colors hover:bg-[var(--color-background-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--forge-500)] focus-visible:outline-offset-2"
      aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
      title={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
    >
      {theme === 'dark' ? (
        <Sun
          className="h-5 w-5 text-[var(--forge-400)] transition-transform hover:rotate-90 duration-500"
          strokeWidth={2}
        />
      ) : (
        <Moon
          className="h-5 w-5 text-[var(--slate-700)] transition-transform hover:-rotate-12 duration-300"
          strokeWidth={2}
        />
      )}
    </button>
  );
}

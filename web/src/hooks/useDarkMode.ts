import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.replace(colorTheme, theme);

    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  useEffect(() => {
    const root = window.document.documentElement;

    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  return [theme, setTheme];
}

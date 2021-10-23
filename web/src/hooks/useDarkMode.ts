import { useEffect, useState } from 'react';

type ITheme = 'dark' | 'light';

export function useDarkMode(): [
  ITheme,
  React.Dispatch<React.SetStateAction<ITheme>>
] {
  const [theme, setTheme] = useState<ITheme>(
    (localStorage.getItem('theme') as ITheme) || 'light'
  );
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.replace(colorTheme, theme);

    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}

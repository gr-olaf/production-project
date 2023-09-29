import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { Theme } from '@/shared/const/theme';
import {
   ThemeContexProps,
   ThemeContext,
} from '@/shared/lib/context/ThemeContext';
import { ReactNode, useEffect, useMemo, useState } from 'react';

interface ThemeProviderProps {
   children: ReactNode;
   initialTheme?: Theme;
}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

const ThemeProvider = (props: ThemeProviderProps) => {
   const { children, initialTheme } = props;
   const [isThemeInited, setIsThemeInited] = useState(false);

   const [theme, setTheme] = useState<Theme>(
      initialTheme || fallbackTheme || Theme.LIGHT,
   );

   useEffect(() => {
      if (!isThemeInited && initialTheme) {
         setTheme(initialTheme);
         setIsThemeInited(true);
      }
   }, [initialTheme, isThemeInited]);

   useEffect(() => {
      document.body.className = theme;
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
   }, [theme]);

   const defaultProps: ThemeContexProps = useMemo(
      () => ({ theme, setTheme }),
      [theme],
   );

   return (
      <ThemeContext.Provider value={defaultProps}>
         {children}
      </ThemeContext.Provider>
   );
};

export default ThemeProvider;

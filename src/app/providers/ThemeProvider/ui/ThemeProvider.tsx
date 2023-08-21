import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { Theme } from '@/shared/const/theme';
import {
   ThemeContexProps,
   ThemeContext,
} from '@/shared/lib/context/ThemeContext';
import { ReactNode, useMemo, useState } from 'react';

const defaultTheme =
   (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

interface ThemeProviderProps {
   children: ReactNode;
   initialTheme?: Theme;
}

const ThemeProvider = (props: ThemeProviderProps) => {
   const { children, initialTheme } = props;

   const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

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

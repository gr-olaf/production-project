import { useJsonSettings } from '@/entities/User';
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

const ThemeProvider = (props: ThemeProviderProps) => {
   const { children, initialTheme } = props;
   const { theme: defaultTheme } = useJsonSettings();
   const [isThemeInited, setIsThemeInited] = useState(false);

   const [theme, setTheme] = useState<Theme>(
      initialTheme || defaultTheme || Theme.LIGHT,
   );

   useEffect(() => {
      if (!isThemeInited && defaultTheme) {
         setTheme(defaultTheme);
         setIsThemeInited(true);
      }
   }, [defaultTheme, isThemeInited]);

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

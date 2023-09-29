import { useJsonSettings } from '@/entities/User';
import ThemeProvider from './ThemeProvider';
import { ComponentType } from 'react';

export const withTheme = (Component: ComponentType) => {
   return () => {
      const { theme: defaultTheme } = useJsonSettings();

      return (
         <ThemeProvider initialTheme={defaultTheme}>
            <Component />
         </ThemeProvider>
      );
   };
};

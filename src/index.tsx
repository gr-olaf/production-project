import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';
import '@/shared/config/i18n/i18n';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { ForceUpdateProvider } from './shared/lib/render/forceUpdate';

const container = document.getElementById('root');

if (!container) {
   throw new Error(
      'Root container was not found. It was not possible to mount the React application.',
   );
}

const root = createRoot(container);

root.render(
   <BrowserRouter>
      <StoreProvider>
         <ErrorBoundary>
            <ForceUpdateProvider>
               <ThemeProvider>
                  <App />
               </ThemeProvider>
            </ForceUpdateProvider>
         </ErrorBoundary>
      </StoreProvider>
   </BrowserRouter>,
);

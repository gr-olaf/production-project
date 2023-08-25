import { getUserInited, initAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import useTheme from '@/shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppRouter } from './providers/router';
import { PageLoader } from '@/widgets/PageLoader';

export const App = () => {
   const { theme } = useTheme();
   const dispatch = useAppDispatch();
   const inited = useSelector(getUserInited);

   useEffect(() => {
      dispatch(initAuthData());
   }, [dispatch]);

   if (!inited) {
      return <PageLoader />;
   }

   return (
      <div className={classNames('app', {}, [theme])}>
         <Suspense fallback="">
            <Navbar />
            <div className="content-page">
               <Sidebar />
               {inited && <AppRouter />}
            </div>
         </Suspense>
      </div>
   );
};

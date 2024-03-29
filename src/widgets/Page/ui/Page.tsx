import { MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Page.module.scss';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUIScrollByPath, uiActions } from '@/features/UI';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { TestProps } from '@/shared/types/tests';
import { toggleFeatures } from '@/shared/lib/features';

interface PageProps extends TestProps {
   className?: string;
   children: ReactNode;
   onScrollEnd?: () => void;
}

export const Page = (props: PageProps) => {
   const { className, children, onScrollEnd } = props;
   const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
   const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
   const dispatch = useAppDispatch();
   const { pathname } = useLocation();
   const scrollPosition = useSelector((state: StateSchema) =>
      getUIScrollByPath(state, pathname),
   );

   useInfiniteScroll({
      triggerRef,
      wrapperRef,
      callback: onScrollEnd,
   });

   useInitialEffect(() => {
      wrapperRef.current.scrollTop = scrollPosition;
   });

   const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
      console.log('scroll');

      dispatch(
         uiActions.setScrollPosition({
            path: pathname,
            position: e.currentTarget.scrollTop,
         }),
      );
   }, 500);

   return (
      <main
         ref={wrapperRef}
         className={classNames(
            toggleFeatures({
               name: 'isAppRedesigned',
               on: () => cls.PageRedesigned,
               off: () => cls.Page,
            }),
            {},
            [className],
         )}
         onScroll={onScroll}
         data-testid={props['data-testid'] ?? 'Page'}
      >
         {children}
         {onScrollEnd ? <div ref={triggerRef} className={cls.trigger} /> : null}
      </main>
   );
};

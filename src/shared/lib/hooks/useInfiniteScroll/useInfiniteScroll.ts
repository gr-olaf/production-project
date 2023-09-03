import { MutableRefObject, useEffect } from 'react';
import { toggleFeatures } from '../../features';

export interface UseInfiniteScrollOptions {
   callback?: () => void;
   triggerRef: MutableRefObject<HTMLElement>;
   wrapperRef?: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
   callback,
   triggerRef,
   wrapperRef,
}: UseInfiniteScrollOptions) {
   useEffect(() => {
      let observer: IntersectionObserver | null = null;

      if (callback) {
         const options = {
            root: toggleFeatures({
               name: 'isAppRedesigned',
               on: () => undefined,
               off: () => wrapperRef?.current,
            }),
            rootMargin: '0px',
            threshold: 1.0,
         };

         observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
               callback();
            }
         }, options);

         observer.observe(triggerRef.current);
      }

      return () => {
         if (observer) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.disconnect();
         }
      };
   }, [callback, triggerRef, wrapperRef]);
}

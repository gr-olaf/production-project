import { Reducer } from '@reduxjs/toolkit';
import {
   ReduxStoreWithManager,
   StateSchema,
   StateSchemaKey,
} from '@/app/providers/StoreProvider';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
   [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
   children: ReactNode;
   reducers: ReducersList;
   removeAfrerUnmount?: boolean;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
   const { children, reducers, removeAfrerUnmount = true } = props;
   const store = useStore() as ReduxStoreWithManager;
   const dispatch = useDispatch();

   useEffect(() => {
      const mountedReducers = store.reducerManager.getReducerMap();

      Object.entries(reducers).forEach(([name, reducer]) => {
         const mounted = mountedReducers[name as StateSchemaKey];

         if (!mounted) {
            store.reducerManager.add(name as StateSchemaKey, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
         }
      });

      return () => {
         if (removeAfrerUnmount) {
            Object.entries(reducers).forEach(([name, reducer]) => {
               store.reducerManager.remove(name as StateSchemaKey);
               dispatch({ type: `@DESTROY ${name} reducer` });
            });
         }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return <>{children}</>;
};

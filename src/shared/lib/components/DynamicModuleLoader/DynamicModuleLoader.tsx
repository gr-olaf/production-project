import { Reducer } from '@reduxjs/toolkit';
import {
	ReduxStoreWithManager,
	StateSchemaKey,
} from 'app/providers/StoreProvider';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
	[name in StateSchemaKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
	reducers: ReducersList;
	removeAfrerUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
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

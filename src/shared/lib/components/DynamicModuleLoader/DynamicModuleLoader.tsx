import { Reducer } from '@reduxjs/toolkit';
import {
	ReduxStoreWithManager,
	StateSchemaKey,
} from 'app/providers/StoreProvider';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducerList = {
	[name in StateSchemaKey]?: Reducer;
};

type ReducerListEnty = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
	reducers: ReducerList;
	removeAfrerUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
	const { children, reducers, removeAfrerUnmount } = props;
	const store = useStore() as ReduxStoreWithManager;
	const dispatch = useDispatch();

	useEffect(() => {
		Object.entries(reducers).forEach(([name, reducer]: ReducerListEnty) => {
			store.reducerManager.add(name, reducer);
			dispatch({ type: `@INIT ${name} reducer` });
		});

		return () => {
			if (removeAfrerUnmount) {
				Object.entries(reducers).forEach(([name, reducer]: ReducerListEnty) => {
					store.reducerManager.remove(name);
					dispatch({ type: `@DESTROY ${name} reducer` });
				});
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{children}</>;
};

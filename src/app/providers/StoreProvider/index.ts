import { createReduxStore } from './config/store';
import { StoreProvider } from './ui/StoreProvider';
import type {
	StateSchema,
	ReduxStoreWithManager,
	StateSchemaKey,
	ThunkConfig,
} from './config/StateSchema';
import type { AppDispatch } from './config/store';
export {
	StoreProvider,
	createReduxStore,
	StateSchema,
	ReduxStoreWithManager,
	StateSchemaKey,
	AppDispatch,
	ThunkConfig,
};

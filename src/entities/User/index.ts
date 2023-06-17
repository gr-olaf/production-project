import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
import { userActions, userReducer } from './model/slice/userSlice';
import type { UserSchema, User } from './model/types/user';

export { userActions, userReducer, UserSchema, User, getUserAuthData };

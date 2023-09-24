import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
   LOCAL_STORAGE_LAST_DESIGN_KEY,
   USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
   'user/initAuthData',
   async (_, thunkAPI) => {
      const { rejectWithValue, dispatch } = thunkAPI;

      const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

      if (!userId) {
         throw new Error('error');
      }

      try {
         const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

         localStorage.setItem(
            LOCAL_STORAGE_LAST_DESIGN_KEY,
            response.features?.isAppRedesigned ? 'new' : 'old',
         );

         return response;
      } catch (error) {
         console.log(error);
         return rejectWithValue('error');
      }
   },
);

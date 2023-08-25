import { ThunkConfig } from '@/app/providers/StoreProvider';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
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

         return response;
      } catch (error) {
         console.log(error);
         return rejectWithValue('error');
      }
   },
);

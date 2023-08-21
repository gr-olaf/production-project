import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddCommentFormSchema } from '../types/AddCommentForm';

const initialState: AddCommentFormSchema = {
   text: '',
};

export const addCommentFormSlice = createSlice({
   name: 'addCommentForm',
   initialState,
   reducers: {
      setText: (state, action: PayloadAction<string>) => {
         state.text = action.payload;
      },
   },
   // extraReducers: (builder) => {
   // 	builder.addCase(loginByUsername.pending, (state) => {
   // 		state.isLoading = true;
   // 		state.error = undefined;
   // 	});
   // 	builder.addCase(loginByUsername.fulfilled, (state, action) => {
   // 		state.isLoading = false;
   // 	});
   // 	builder.addCase(loginByUsername.rejected, (state, action) => {
   // 		state.isLoading = false;
   // 		state.error = action.payload;
   // 	});
   // },
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;

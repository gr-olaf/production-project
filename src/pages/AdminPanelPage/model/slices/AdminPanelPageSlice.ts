import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminPanelPageSchema } from '../types/AdminPanelPageSchema';

const initialState: AdminPanelPageSchema = {
   id: '1',
};

export const AdminPanelPageSlice = createSlice({
   name: 'AdminPanelPage',
   initialState,
   reducers: {
      template: (state, action: PayloadAction<string>) => {
         return;
      },
   },
   // extraReducers: (builder) => {
   //     builder
   //         .addCase(, (state) => {
   //             state.error = undefined;
   //             state.isLoading = true;
   //         })
   //         .addCase(, (state) => {
   //             state.isLoading = false;
   //         })
   //         .addCase(, (state, action) => {
   //             state.isLoading = false;
   //             state.error = action.payload;
   //         });
   // },
});

export const { actions: AdminPanelPageActions } = AdminPanelPageSlice;
export const { reducer: AdminPanelPageReducer } = AdminPanelPageSlice;

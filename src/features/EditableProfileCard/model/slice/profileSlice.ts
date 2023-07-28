import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { Profile } from '@/entities/Profile';
import { ProfileSchema } from '../types/EditableProfileCardSchema';

const initialState: ProfileSchema = {
	data: undefined,
	isLoading: false,
	error: undefined,
	readonly: true,
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setReadOnly: (state, action: PayloadAction<boolean>) => {
			state.readonly = action.payload;
		},
		updateProfile: (state, action: PayloadAction<Profile>) => {
			state.form = {
				...state.form,
				...action.payload,
			};
		},
		cancelEdit: (state) => {
			state.readonly = true;
			state.validateErrors = undefined;
			state.form = state.data;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProfileData.pending, (state) => {
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(
			fetchProfileData.fulfilled,
			(state, action: PayloadAction<Profile>) => {
				state.isLoading = false;
				state.data = action.payload;
				state.form = action.payload;
			}
		);
		builder.addCase(fetchProfileData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
		//
		builder.addCase(updateProfileData.pending, (state) => {
			state.isLoading = true;
			state.validateErrors = undefined;
		});
		builder.addCase(
			updateProfileData.fulfilled,
			(state, action: PayloadAction<Profile>) => {
				state.isLoading = false;
				state.data = action.payload;
				state.form = action.payload;
				state.readonly = true;
			}
		);
		builder.addCase(updateProfileData.rejected, (state, action) => {
			state.isLoading = false;
			state.validateErrors = action.payload;
		});
	},
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;

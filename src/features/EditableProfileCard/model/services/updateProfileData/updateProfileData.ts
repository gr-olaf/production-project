import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { Profile } from 'entities/Profile';
import { ValidateProfileError } from '../../types/EditableProfileCardSchema';

export const updateProfileData = createAsyncThunk<
	Profile,
	void,
	ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, thunkAPI) => {
	const { extra, rejectWithValue, getState } = thunkAPI;

	const formData = getProfileForm(getState());

	const errors = validateProfileData(formData);

	if (errors.length > 0) {
		return rejectWithValue(errors);
	}

	try {
		const response = await extra.api.put<Profile>(
			'/profile/' + formData?.id,
			formData
		);

		if (!response.data) {
			throw new Error();
		}

		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
	}
});

import { Currency } from 'entities/Currency';
import { profileActions, profileReducer } from './profileSlice';
import { Country } from 'entities/Country';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import {
	ProfileSchema,
	ValidateProfileError,
} from '../types/EditableProfileCardSchema';

const data = {
	first: 'Firstname',
	lastname: 'Lastname',
	age: 25,
	city: 'City',
	username: 'Username',
	currency: Currency.RUB,
	country: Country.Russia,
};

describe('profileSlice.test', () => {
	test('test setReadOnly', () => {
		const state: DeepPartial<ProfileSchema> = { readonly: false };
		expect(
			profileReducer(state as ProfileSchema, profileActions.setReadOnly(true))
		).toEqual({ readonly: true });
	});
	test('test cancelEdit', () => {
		const state: DeepPartial<ProfileSchema> = { data };
		expect(
			profileReducer(state as ProfileSchema, profileActions.cancelEdit())
		).toEqual({ readonly: true, validateErrors: undefined, form: data, data });
	});
	test('test updateProfile', () => {
		const state: DeepPartial<ProfileSchema> = {
			form: { username: 'User' },
		};
		expect(
			profileReducer(
				state as ProfileSchema,
				profileActions.updateProfile({ username: 'Username' })
			)
		).toEqual({ form: { username: 'Username' } });
	});
	test('test updateProfile service pending', () => {
		const state: DeepPartial<ProfileSchema> = {
			isLoading: false,
			validateErrors: [ValidateProfileError.SERVER_ERROR],
		};
		expect(
			profileReducer(state as ProfileSchema, updateProfileData.pending)
		).toEqual({
			isLoading: true,
			validateErrors: undefined,
		});
	});
	test('test updateProfile service fulfilled', () => {
		const state: DeepPartial<ProfileSchema> = {
			isLoading: true,
		};
		expect(
			profileReducer(
				state as ProfileSchema,
				updateProfileData.fulfilled(data, '')
			)
		).toEqual({
			isLoading: false,
			readonly: true,
			validateErrors: undefined,
			form: data,
			data,
		});
	});
});

import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { ValidateProfileError } from '../../types/profile';

const validateErrors = [
	ValidateProfileError.SERVER_ERROR,
	ValidateProfileError.NO_DATA,
];

describe('getProfileValidateErrors.test', () => {
	test('should return array of errors', () => {
		const state: DeepPartial<StateSchema> = {
			profile: {
				validateErrors,
			},
		};
		expect(getProfileValidateErrors(state as StateSchema)).toEqual(
			validateErrors
		);
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
	});
});

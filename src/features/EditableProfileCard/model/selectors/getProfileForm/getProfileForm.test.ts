import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

const data = {
	first: 'Firstname',
	lastname: 'Lastname',
	age: 25,
	city: 'City',
	username: 'Username',
	currency: Currency.RUB,
	country: Country.Russia,
};

describe('getProfileForm.test', () => {
	test('should return form data', () => {
		const state: DeepPartial<StateSchema> = {
			profile: {
				form: data,
			},
		};
		expect(getProfileForm(state as StateSchema)).toEqual(data);
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileForm(state as StateSchema)).toEqual(undefined);
	});
});

import { Currency } from 'entities/Currency';
import { fetchProfileData } from './fetchProfileData';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
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

describe('fetchProfileData.test', () => {
	test('success', async () => {
		const thunk = new TestAsyncThunk(fetchProfileData);
		thunk.api.get.mockReturnValue(Promise.resolve({ data }));
		const result = await thunk.callThunk();

		expect(thunk.api.get).toHaveBeenCalled();
		expect(result.meta.requestStatus).toEqual('fulfilled');
		expect(result.payload).toEqual(data);
	});

	test('error', async () => {
		const thunk = new TestAsyncThunk(fetchProfileData);
		thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await thunk.callThunk();

		expect(result.meta.requestStatus).toEqual('rejected');
	});
});

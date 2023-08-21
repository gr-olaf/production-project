import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileData } from './getProfileData';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

const data = {
   first: 'Firstname',
   lastname: 'Lastname',
   age: 25,
   city: 'City',
   username: 'Username',
   currency: Currency.RUB,
   country: Country.Russia,
};

describe('getProfileData.test', () => {
   test('should return data', () => {
      const state: DeepPartial<StateSchema> = {
         profile: {
            data,
         },
      };
      expect(getProfileData(state as StateSchema)).toEqual(data);
   });
   test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getProfileData(state as StateSchema)).toEqual(undefined);
   });
});

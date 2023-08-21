import { Currency } from '@/entities/Currency';
import { validateProfileData } from './validateProfileData';
import { Country } from '@/entities/Country';
import { ValidateProfileError } from '../../consts/consts';

const data = {
   first: 'Firstname',
   lastname: 'Lastname',
   age: 25,
   city: 'City',
   username: 'Username',
   currency: Currency.RUB,
   country: Country.Russia,
};

describe('validateProfileData.test', () => {
   test('success', async () => {
      const result = validateProfileData(data);

      expect(result).toEqual([]);
   });

   test('without firstname and lastname', async () => {
      const result = validateProfileData({ ...data, first: '', lastname: '' });

      expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
   });

   test('incorrect age', async () => {
      const result = validateProfileData({ ...data, age: undefined });

      expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
   });

   test('incorrect city', async () => {
      const result = validateProfileData({ ...data, city: '' });

      expect(result).toEqual([ValidateProfileError.INCORRECT_CITY]);
   });

   test('incorrect all', async () => {
      const result = validateProfileData({});

      expect(result).toEqual([
         ValidateProfileError.INCORRECT_USER_DATA,
         ValidateProfileError.INCORRECT_AGE,
         ValidateProfileError.INCORRECT_CITY,
      ]);
   });
});

import { selector } from 'recoil';

import { getCountries } from '../apis/countries';

export const countriesSelector = selector({
  key: 'countries',
  get: async () => {
    const response = await getCountries();

    return response.data.countries;
  },
});

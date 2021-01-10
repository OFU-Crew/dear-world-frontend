import { selector } from 'recoil';

import { getCountries, getCountriesCount, getCountriesRank } from '../api';

export const countriesSelector = selector({
  key: 'countries',
  get: async () => {
    const response = await getCountries();

    return response.data.countries;
  },
});

export const countriesCountState = selector({
  key: 'countriesCount',
  get: async () => {
    const {
      data: { countries },
    } = await getCountriesCount();

    return countries;
  },
});

export const countriesRankState = selector({
  key: 'countriesRank',
  get: async () => {
    const {
      data: { ranking },
    } = await getCountriesRank();

    return ranking;
  },
});

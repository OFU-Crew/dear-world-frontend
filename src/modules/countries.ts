import { selector } from 'recoil';

import { getCountriesCount, getCountriesRank } from '../apis/countries';

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

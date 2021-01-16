import { atom, selector } from 'recoil';

import { getCountries, getCountriesCount, getCountriesRank } from '../api';

export interface OrderingProps {
  id: number;
  fullName: string;
}

export interface CountryProps {
  id: number;
  code?: string;
  fullName: string;
  emojiUnicode?: string;
}

export const selectedCountryState = atom({
  key: 'selectedCountry',
  default: {
    id: 0,
    code: '',
    fullName: 'Whole world',
  },
});

export const countriesState = selector({
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

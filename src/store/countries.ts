import { atom, selector } from 'recoil';

import { getCountries, getCountriesCount, getCountriesRank } from '../api';

export interface OrderingState {
  id: number;
  fullName: string;
}

export interface CountryState {
  id: number;
  code: string;
  fullName: string;
  emojiUnicode?: string;
  imageUrl?: string;
  countryStatus?: {
    id: number;
    messageCount: number;
    likeCount: number;
    level: number;
    population: string | null;
  };
}

interface SelectedCountryState extends CountryState {
  scrollTop?: number;
}

export const selectedCountryAtom = atom<SelectedCountryState>({
  key: 'selectedCountryAtom',
  default: {
    id: 0,
    code: '',
    fullName: 'Whole world',
  },
});

export const countriesSelector = selector<CountryState[]>({
  key: 'countriesSelector',
  get: async () => {
    const {
      data: { countries },
    } = await getCountries();

    return countries;
  },
});

export const countriesCountSelector = selector<CountryState[]>({
  key: 'countriesCountSelector',
  get: async () => {
    const {
      data: { countries },
    } = await getCountriesCount();

    return countries;
  },
});

export const countriesRankSelector = selector<CountryState[]>({
  key: 'countriesRankSelector',
  get: async () => {
    const {
      data: { ranking },
    } = await getCountriesRank();

    return ranking;
  },
});

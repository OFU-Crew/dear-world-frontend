import { selector, selectorFamily, SerializableParam } from 'recoil';

import { messagesCountParams } from '../api';
import {
  getCountries,
  getCountriesCount,
  getCountriesRank,
  getMessagesCount,
} from '../api';

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

export const countriesSelector = selector({
  key: 'countries',
  get: async () => {
    const response = await getCountries();

    return response.data.countries;
  },
});

export const messagesCountState = selectorFamily({
  key: 'messagesCount',
  get: (params: SerializableParam = {}) => async () => {
    const {
      data: { messageCount },
    } = await getMessagesCount(params as messagesCountParams);

    return messageCount;
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

import { getApi } from './core';

export const getCountries = () => getApi('/countries');

export interface messagesCountParams {
  countryCode?: string;
}
export const getMessagesCount = ({ countryCode }: messagesCountParams) =>
  getApi('/countries/messagecount', { params: { countryCode } });

export const getCountriesCount = () => {
  return getApi('/countries/count');
};

export const getCountriesRank = () => {
  return getApi('/countries/rank');
};

import { getApi } from './core';

export const getCountries = () => getApi('/countries');

export interface messageCountParams {
  countryCode?: string;
}
export const getMessageCount = ({ countryCode }: messageCountParams) =>
  getApi('/countries/messagecount', { params: { countryCode } });

export const getCountriesCount = () => {
  return getApi('/countries/count');
};

export const getCountriesRank = () => {
  return getApi('/countries/rank');
};

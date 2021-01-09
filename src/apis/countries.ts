import { getApi } from './core';

export const getCountriesCount = () => {
  return getApi('/countries/count');
};

export const getCountriesRank = () => {
  return getApi('/countries/rank');
};

import { getApi } from './core';

interface getMessagesParams {
  countryId: number;
  currentPage: number;
}
export const getMessages = (params: getMessagesParams) => {
  return getApi('/messages', {
    params: {
      countryId: params.countryId,
      offset: params.currentPage - 1,
    },
  });
};

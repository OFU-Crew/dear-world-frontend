import { getApi } from './core';

interface getMessagesParams {
  countryCode?: string;
  type?: string;
  lastId?: string;
}
export const getMessages = ({ countryCode, type, lastId }: getMessagesParams) =>
  getApi('/messages', { params: { countryCode, type, lastId } });

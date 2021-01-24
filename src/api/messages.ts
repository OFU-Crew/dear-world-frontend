import { getApi } from './core';

interface getMessagesParams {
  countryCode?: string;
  type?: string;
  lastId?: string | null;
}
export const getMessages = ({ countryCode, type, lastId }: getMessagesParams) =>
  getApi('/messages', { params: { countryCode, type, lastId } });

export interface messageCountParams {
  countryCode?: string;
  type?: string;
}
export const getMessageCount = ({ countryCode }: messageCountParams) =>
  getApi('/countries/messagecount', { params: { countryCode } });

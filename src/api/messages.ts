import { getApi, postApi } from './core';

interface messageParams {
  messageId: number;
}
export const getMessage = ({ messageId }: messageParams) =>
  getApi(`/messages/${messageId}`);

interface getMessagesParams {
  countryCode?: string;
  type?: string;
  lastId?: string | null;
}
export const getMessages = ({ countryCode, type, lastId }: getMessagesParams) =>
  getApi('/messages', { params: { countryCode, type, lastId } });

interface messageCountParams {
  countryCode?: string;
  type?: string;
}
export const getMessageCount = ({ countryCode }: messageCountParams) =>
  getApi('/countries/messagecount', { params: { countryCode } });

interface messageLikeParams {
  messageId: number;
}
export const postMessageLike = ({ messageId }: messageLikeParams) =>
  postApi(`/messages/${messageId}/like`);

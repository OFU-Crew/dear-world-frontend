import { selector, selectorFamily, SerializableParam } from 'recoil';

import { getMessageCount, getMessages, messageCountParams } from '../api';

export const messagesState = selector({
  key: 'messages',
  get: async () => {
    const response = await getMessages({});

    return response.data;
  },
});

export const messageCountState = selectorFamily({
  key: 'messageCount',
  get: (params: SerializableParam = {}) => async () => {
    const {
      data: { messageCount },
    } = await getMessageCount(params as messageCountParams);

    return messageCount;
  },
});

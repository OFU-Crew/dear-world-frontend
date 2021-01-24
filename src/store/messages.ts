import { atom, selector } from 'recoil';

export const messagesAtom = atom({
  key: 'messagesAtom',
  default: [],
});

export const messageCountAtom = atom<number>({
  key: 'messageCountAtom',
  default: 0,
});

export const parsedMessageCountSelector = selector({
  key: 'parsedMessageCountSelector',
  get: ({ get }) => {
    const messageCount = get(messageCountAtom);

    if (messageCount < 1000) {
      return messageCount;
    }

    const suffix = Math.floor(messageCount / 1000);
    const decimal = (messageCount % 1000).toString()[0];

    return `${suffix}.${decimal}k`;
  },
});

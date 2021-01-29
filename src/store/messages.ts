import { atom, atomFamily, selector } from 'recoil';

interface MessageState {
  anonymousUser: {
    id: number;
    emoji: { unicode: string };
    nickname: string;
    country: {
      emojiUnicode: string;
      fullName: string;
    };
  };
  content: string;
  like: boolean;
  likeCount: number;
}

export const messageAtomFamily = atomFamily<MessageState, number>({
  key: 'messageAtomFamily',
  default: id => ({
    id,
    anonymousUser: {
      id: 0,
      emoji: { unicode: '' },
      nickname: '',
      country: { emojiUnicode: '', fullName: '' },
    },
    content: '',
    like: false,
    likeCount: 0,
  }),
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

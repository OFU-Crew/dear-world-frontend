import {
  GridLayout,
  OnAppend,
  OnLayoutComplete,
} from '@egjs/react-infinitegrid';
import React, { ComponentType, FC, Suspense, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { getMessages } from '../api';
import {
  countriesQueryState,
  decodeURI,
  orderingQueryState,
  selectedCountryAtom,
} from '../store';
import Loading from './common/Loading';
import MessageCard, { MessageCardProps } from './MessageCard';

const Wrapper = styled.div`
  width: 100%;
`;

interface AsyncMessageListProps {
  visible: boolean;
}

const AsyncMessageList: FC<AsyncMessageListProps> = ({ visible }) => {
  const orderingQuery = useRecoilValue(orderingQueryState);
  const selectedCountry = useRecoilValue(selectedCountryAtom);
  const [messageList, setMessageList] = useState<
    ComponentType<MessageCardProps>[]
  >([]);
  const [lastId, setLastId] = useState<string>();

  const onAppend = async ({ groupKey, startLoading }: OnAppend) => {
    if (
      !visible ||
      (decodeURI(orderingQuery) === 'Weekly HOT' && messageList.length)
    ) {
      return;
    }
    startLoading && startLoading();

    const { data } = await getMessages({
      countryCode: selectedCountry ? selectedCountry.code : '',
      type: orderingQuery === 'Recent' ? 'recent' : 'weekly_hot',
      lastId,
    });

    const messages = data.messages.map((message: MessageCardProps) => (
      <MessageCard
        groupKey={groupKey}
        key={message.id}
        anonymousUser={message.anonymousUser}
        content={message.content}
        like={message.like}
        likeCount={message.likeCount}
      />
    ));

    setMessageList([...messageList, messages]);
    setLastId(data.lastId);
  };

  const onLayoutComplete = ({ isLayout, endLoading }: OnLayoutComplete) => {
    !isLayout && endLoading && endLoading();
  };

  return (
    <GridLayout
      tag="div"
      useFirstRender={false}
      onAppend={onAppend}
      onLayoutComplete={onLayoutComplete}
      layoutOptions={{
        margin: 30,
        align: 'center',
        itemSize: 380,
      }}
      options={{
        threshold: 1000,
        isOverflowScroll: false,
        isEqualSize: false,
        useFit: false,
        useRecycle: false,
        horizontal: false,
      }}
    >
      {messageList}
    </GridLayout>
  );
};

const MessageList: FC = () => {
  const [visible, setVisible] = useState(false);
  const countriesQuery = useRecoilValue(countriesQueryState);
  const orderingQuery = useRecoilValue(orderingQueryState);

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = setTimeout(() => setVisible(true), 100);

    return () => {
      clearTimeout(id);
      setVisible(false);
    };
  }, [countriesQuery, orderingQuery]);

  return (
    <Suspense fallback={<div />}>
      <Wrapper>{visible ? <AsyncMessageList visible /> : <Loading />}</Wrapper>
    </Suspense>
  );
};

export default MessageList;

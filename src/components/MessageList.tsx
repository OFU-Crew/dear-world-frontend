import {
  GridLayout,
  OnAppend,
  OnLayoutComplete,
} from '@egjs/react-infinitegrid';
import React, { ComponentType, FC, Suspense, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { getMessageCount, getMessages } from '../api';
import { decodeURI, messageCountAtom, selectedCountryAtom } from '../store';
import Loading from './common/Loading';
import MessageCard, { MessageCardProps } from './MessageCard';

const Wrapper = styled.div`
  width: 100%;
`;

interface MessageListProps {
  countriesQuery?: string;
  orderingQuery: string;
}

interface AsyncMessageListProps extends MessageListProps {
  visible: boolean;
}

const AsyncMessageList: FC<AsyncMessageListProps> = ({
  visible,
  orderingQuery,
}) => {
  const selectedCountry = useRecoilValue(selectedCountryAtom);
  const [messageList, setMessageList] = useState<
    ComponentType<MessageCardProps>[]
  >([]);
  const [lastId, setLastId] = useState<string>();
  const setMessageCount = useSetRecoilState(messageCountAtom);

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

    let messageCount = data.messages.length;
    if (orderingQuery === 'Recent') {
      const response = await getMessageCount({
        countryCode: selectedCountry ? selectedCountry.code : '',
      });
      messageCount = response.data.messageCount;
    }
    setMessageCount(messageCount);
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

const MessageList: FC<MessageListProps> = ({
  countriesQuery,
  orderingQuery,
}) => {
  const [visible, setVisible] = useState(false);

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
      <Wrapper>
        {visible ? (
          <AsyncMessageList visible orderingQuery={orderingQuery} />
        ) : (
          <Loading />
        )}
      </Wrapper>
    </Suspense>
  );
};

export default MessageList;

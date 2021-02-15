import React, { FC, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { Layout, MessageCard, MessageFilterBar } from '../components';
import MessageCardDetail from '../components/MessageCardDetail';
import { sizes } from '../constants';
import { useWindowDimensions } from '../hooks';
import { messageSelectorFamily } from '../store';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-14%);
`;

interface AsyncMesssageProps {
  id: number;
}

const AsyncMessage: FC<AsyncMesssageProps> = ({ id }) => {
  const [width] = useWindowDimensions();
  const messgae = useRecoilValue(messageSelectorFamily(id));

  return width > sizes.desktop ? (
    <Wrapper>
      <MessageCardDetail
        key={id}
        id={id}
        anonymousUser={messgae.anonymousUser}
        content={messgae.content}
        like={messgae.like}
        likeCount={messgae.likeCount}
      />
    </Wrapper>
  ) : (
    <MessageCard
      key={id}
      id={id}
      anonymousUser={messgae.anonymousUser}
      content={messgae.content}
      like={messgae.like}
      likeCount={messgae.likeCount}
    />
  );
};

const Message: FC = () => {
  const location = useLocation();
  const id = parseInt(location.pathname.split('/')[2], 10);

  return (
    <Layout>
      <Suspense fallback={<div />}>
        <AsyncMessage id={id} />
      </Suspense>
    </Layout>
  );
};

export default Message;

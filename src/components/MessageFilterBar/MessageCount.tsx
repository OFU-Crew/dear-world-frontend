import React, { FC, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { messageCountAtom } from '../../store';

const CountWrapper = styled.span`
  font-size: 26px;
  font-weight: bold;
  margin-right: 8px;

  color: ${props => props.theme.color.messageCount};
`;

const UnitWrapper = styled.span`
  font-size: 25px;

  color: ${props => props.theme.color.filter};
`;

const AsyncMessageCount: FC = () => {
  const messageCount = useRecoilValue(messageCountAtom);

  return (
    <React.Fragment>
      <CountWrapper>{messageCount}</CountWrapper>
      <UnitWrapper>Messages</UnitWrapper>
    </React.Fragment>
  );
};

const MessageCount: FC = () => {
  return (
    <Suspense fallback={<div />}>
      <AsyncMessageCount />
    </Suspense>
  );
};

export default MessageCount;

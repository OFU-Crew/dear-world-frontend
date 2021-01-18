import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  margin: 10;
`;

const spinner = keyframes`
  0% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 0 auto;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 5px solid rgba(0, 0, 0, 0);
  border-top-color: #7396a5;
  animation: ${spinner} 700ms linear infinite;
`;

const Loading: FC = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};
export default Loading;

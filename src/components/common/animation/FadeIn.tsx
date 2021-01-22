import React, { FC, Fragment, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
`;

const Wrapper = styled.div<{ duration?: number }>`
  width: 100%;
  animation: ${fadeIn};
  animation-duration: ${props => `${props.duration || 1}s`};
`;

interface FadeProps {
  show: boolean;
  duration?: number;
}

const FadeIn: FC<FadeProps> = ({ show, duration, children }) => {
  return (
    <Fragment>
      {show && <Wrapper duration={duration}>{children}</Wrapper>}
    </Fragment>
  );
};

export default FadeIn;

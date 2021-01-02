import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Layout } from '../components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-120px);
`;

const Image = styled.img``;

const MessageWrapper = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;

  color: ${props => props.theme.color.menu};
`;

const BackButton = styled.button`
  width: 243px;
  height: 57px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 18px;
  outline: 0;
  cursor: pointer;
  border: 0px;
  margin-top: 50px;

  background: '#D6DDFB';

  color: ${props => props.theme.color.menu};
`;

const NotFound: FC<RouteComponentProps> = ({ history }) => (
  <Layout>
    <Wrapper>
      <Image src="not-found.svg" />
      <MessageWrapper>Ooops..</MessageWrapper>
      <MessageWrapper>This page does not exist</MessageWrapper>
      <BackButton onClick={history.goBack}>Go to main page</BackButton>
    </Wrapper>
  </Layout>
);

export default NotFound;

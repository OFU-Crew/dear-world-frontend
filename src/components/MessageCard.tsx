import React from 'react';
import styled from 'styled-components';

import { THEME, useModal, useTheme } from '../hooks';
import { Confirmation, Modal } from '.';
import FadeIn from './common/animation/FadeIn';
import Emoji from './common/Emoji';

const MessageCardWrapper = styled.div`
  background: #fff;
  box-shadow: 0px 4px 10px 10px rgba(33, 46, 90, 0.02);
  border-radius: 30px;
  width: 380px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  background-color: ${props => props.theme.backgroundColor.card};

  ${({ theme }) => theme.media.mobile`
    width: 90%;
  `};
`;

const MessageHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const HeaderImage = styled.div`
  flex: 0 0 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${props => props.theme.url.messageBg}) no-repeat center;
  background-size: cover;
  margin-right: 12px;
`;

const HeaderDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderDescriptionName = styled.div`
  flex: 0 1 100%;
  font-weight: 700;
  font-size: 18px;

  color: ${props => props.theme.color.messageNickname};
`;

const HeaderDescriptionCountry = styled.div`
  flex: 0 1 100%;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  display: flex;

  color: ${props => props.theme.color.messageCountry};
`;

const Contents = styled.div`
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  margin-bottom: 10px;

  color: ${props => props.theme.color.messageDescription};
`;
const MessageFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessageHeart = styled.img``;

const LikeWrapper = styled.div<{ like: boolean }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: ${props =>
    props.like
      ? props.theme.backgroundColor.activeHeart
      : props.theme.backgroundColor.heart};
`;

const LikeCountWrapper = styled.div<{ like: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 9px;
  font-size: 16px;
  font-weight: 400;
  color: ${props =>
    props.like
      ? props.theme.backgroundColor.activeHeart
      : props.theme.backgroundColor.heart};
`;

const LikeButton = styled.button`
  flex: 0 0 48px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  border-style: none;
  background: ${props => props.theme.backgroundColor.card};
`;

const ShareButton = styled.button`
  flex: 0 0 48px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${props => props.theme.url.shareButton}) no-repeat center;
  background-size: cover;
  border-style: none;

  &:hover {
    background: url(${props => props.theme.url.shareButtonHover}) no-repeat
      center;
  }
`;

export interface MessageCardProps {
  id?: number;
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
  groupKey?: any;
}

const MessageCard = (props: MessageCardProps) => {
  const [theme] = useTheme();

  const { isShown, toggle } = useModal();

  const onConfirm = () => toggle();
  const onCancel = () => toggle();

  return (
    <>
      <MessageCardWrapper onClick={toggle}>
        <FadeIn show={true}>
          {/* <a href="#" onClick={toggle}> */}
          <MessageHeader>
            <HeaderImage>
              <Emoji code={props.anonymousUser.emoji.unicode} />
            </HeaderImage>
            <HeaderDescription>
              <HeaderDescriptionName>
                {props.anonymousUser.nickname}
              </HeaderDescriptionName>
              <HeaderDescriptionCountry>
                <span style={{ marginRight: 5 }}>
                  <Emoji code={props.anonymousUser.country.emojiUnicode} />
                </span>
                {props.anonymousUser.country.fullName}
              </HeaderDescriptionCountry>
            </HeaderDescription>
          </MessageHeader>
          <Contents>{props.content}</Contents>
          <MessageFooter>
            <LikeWrapper like={props.like}>
              <LikeButton>
                <MessageHeart
                  src={
                    props.like
                      ? '/images/heart-activate.svg'
                      : theme === THEME.LIGHT
                      ? '/images/heart-inactivate.svg'
                      : '/images/heart-inactivate-dark.svg'
                  }
                />
                <LikeCountWrapper like={props.like}>
                  {props.likeCount}
                </LikeCountWrapper>
              </LikeButton>
            </LikeWrapper>

            <ShareButton
              onClick={e => {
                e.stopPropagation();
                console.log('share');
              }}
            />
          </MessageFooter>
          {/* </a> */}
        </FadeIn>
      </MessageCardWrapper>

      <Modal
        isShown={isShown}
        hide={toggle}
        headerText="Confirmation"
        modalContent={
          <Confirmation
            onConfirm={onConfirm}
            onCancel={onCancel}
            message="Are you sure you want to delete element?"
          />
        }
      />
    </>
  );
};

export default MessageCard;

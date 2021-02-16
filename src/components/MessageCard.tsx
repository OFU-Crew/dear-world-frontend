import React, { ComponentType, useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { postMessageLike } from '../api';
import { sizes } from '../constants';
import { THEME, useModal, useTheme, useWindowDimensions } from '../hooks';
import { messageAtomFamily } from '../store';
import { Confirmation, Modal } from '.';
import FadeIn from './common/animation/FadeIn';
import MessageCardDetail from './MessageCardDetail';
import ShareLinkBox from './ShareLinkBox';

const MessageCardWrapper = styled.div<{ isDesktop?: boolean }>`
  box-shadow: 0px 4px 10px 10px rgba(33, 46, 90, 0.02);
  border-radius: 30px;
  width: 380px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  cursor: ${props => (props.isDesktop ? 'pointer' : '')};

  background-color: ${props => props.theme.backgroundColor.card};

  ${({ theme }) => theme.media.mobile`
    width: 90%;
  `};
`;

const MessageHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const HeaderImageWrapper = styled.div`
  flex: 0 0 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${props => props.theme.url.messageBg}) no-repeat center;
  background-size: cover;
  margin-right: 12px;
`;

const Image = styled.img<{
  width?: number;
  height?: number;
  marginRight?: number;
  marginTop?: number;
}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  margin-top: ${({ marginTop }) => marginTop}px;
  margin-right: ${({ marginRight }) => marginRight}px;
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
    emoji: {
      unicode: string;
      imageUrl: string;
    };
    nickname: string;
    country: {
      emojiUnicode: string;
      fullName: string;
      imageUrl: string;
    };
  };
  content: string;
  like: boolean;
  likeCount: number;
  groupKey?: any;
}

const MessageCard = (props: MessageCardProps) => {
  const [width] = useWindowDimensions();
  const [theme] = useTheme();
  const { isShown, toggle } = useModal();
  const isDesktop = width > sizes.desktop;

  const [message, setMessage] = useRecoilState(messageAtomFamily(props.id!));
  const [like, setLike] = useState(props.like);
  const [likeCount, setLikeCount] = useState(props.likeCount);

  const [isClickedShareButton, setIsClickedShareButton] = useState(false);

  const clickLikeButton = useCallback(
    e => {
      e.stopPropagation();
      setLike(!like);
      setLikeCount(prev => (like ? prev - 1 : prev + 1));
      setMessage(prev => ({
        ...prev,
        like: !like,
        likeCount: like ? likeCount - 1 : likeCount + 1,
      }));
      postMessageLike({ messageId: props.id! });
    },
    [like, likeCount],
  );

  const clickShareButton = useCallback(e => {
    e.stopPropagation();
    setIsClickedShareButton(prev => !prev);
    toggle();
  }, []);

  const hideModal = useCallback(() => {
    if (isClickedShareButton) {
      setIsClickedShareButton(prev => !prev);
    }
    toggle();
  }, [toggle, setIsClickedShareButton]);

  useEffect(() => {
    setMessage({
      ...props,
    });
  }, [setMessage]);

  return (
    <>
      <MessageCardWrapper
        isDesktop={isDesktop}
        onClick={isDesktop ? toggle : () => {}}
      >
        <FadeIn show={true}>
          <MessageHeader>
            <HeaderImageWrapper>
              <Image src={message.anonymousUser.emoji.imageUrl} width={25} />
            </HeaderImageWrapper>
            <HeaderDescription>
              <HeaderDescriptionName>
                {message.anonymousUser.nickname}
              </HeaderDescriptionName>
              <HeaderDescriptionCountry>
                <Image
                  src={message.anonymousUser.country.imageUrl}
                  width={14}
                  height={14}
                  marginTop={3}
                  marginRight={5}
                />
                {message.anonymousUser.country.fullName}
              </HeaderDescriptionCountry>
            </HeaderDescription>
          </MessageHeader>
          <Contents>{message.content}</Contents>
          <MessageFooter>
            <LikeWrapper like={message.like}>
              <LikeButton onClick={clickLikeButton}>
                <MessageHeart
                  src={
                    message.like
                      ? '/images/heart-activate.svg'
                      : theme === THEME.LIGHT
                      ? '/images/heart-inactivate.svg'
                      : '/images/heart-inactivate-dark.svg'
                  }
                />
                <LikeCountWrapper like={message.like}>
                  {message.likeCount}
                </LikeCountWrapper>
              </LikeButton>
            </LikeWrapper>

            <ShareButton onClick={isDesktop ? clickShareButton : () => {}} />
          </MessageFooter>
        </FadeIn>
      </MessageCardWrapper>

      <Modal
        isShown={isShown}
        hide={hideModal}
        headerText="Confirmation"
        modalContent={
          isClickedShareButton ? (
            <ShareLinkBox hide={hideModal} messageId={props.id} />
          ) : (
            <MessageCardDetail {...props} />
          )
        }
      />
    </>
  );
};

export default MessageCard;

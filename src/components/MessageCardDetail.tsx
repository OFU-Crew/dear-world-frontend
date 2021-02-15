import React, { useCallback, useEffect, useState } from 'react';
import { Flip, toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { postMessageLike } from '../api';
import { THEME, useTheme } from '../hooks';
import { messageAtomFamily } from '../store';

const MessageCardWrapper = styled.div`
  box-shadow: 0px 4px 10px 10px rgba(33, 46, 90, 0.02);
  border-radius: 30px;
  width: 800px;
  padding: 50px 70px;
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

const HeaderImageWrapper = styled.div`
  width: 100px;
  height: 100px;
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
  width: 540px;
  margin-left: 14px;
`;

const HeaderDescriptionName = styled.div`
  flex: 0 1 100%;
  font-weight: 700;
  font-size: 40px;
  margin-top: 3px;

  color: ${props => props.theme.color.messageNickname};
`;

const HeaderDescriptionCountry = styled.div`
  flex: 0 1 100%;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  margin-top: 12px;
  display: flex;

  color: ${props => props.theme.color.messageCountry};
`;

const Contents = styled.div`
  font-size: 22px;
  line-height: 22px;
  font-weight: 400;
  margin: 30px 0 45px 0;

  color: ${props => props.theme.color.messageDescription};
`;
const MessageFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeWrapper = styled.div<{ like: boolean }>`
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 400;
  color: ${props =>
    props.like
      ? props.theme.backgroundColor.activeHeart
      : props.theme.backgroundColor.heart};
`;

const LikeCountWrapper = styled.div<{ like: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 12px;
  font-size: 22px;
  font-weight: 400;
  color: ${props =>
    props.like
      ? props.theme.backgroundColor.activeHeart
      : props.theme.backgroundColor.heart};
`;

const LikeButton = styled.button`
  flex: 0 0 72px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  border-style: none;
  background: ${props => props.theme.backgroundColor.card};
`;

const ShareButton = styled.button`
  flex: 0 0 72px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${props => props.theme.url.shareButton}) no-repeat center;
  background-size: cover;
  border-style: none;

  &:hover {
    background: url(${props => props.theme.url.shareButtonHover}) no-repeat
      center;
    background-size: cover;
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
}

const MessageCardDetail = (props: MessageCardProps) => {
  const [theme] = useTheme();

  const [message, setMessage] = useRecoilState(messageAtomFamily(props.id!));
  const [like, setLike] = useState(message.like);
  const [likeCount, setLikeCount] = useState(message.likeCount);

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
    const url = `https://dear-world.live/messages/${props.id}`;
    navigator.clipboard.writeText(url).then(() => {
      toast('Successfully copied link to clipboard.', {
        style: {
          borderRadius: '16px',
          padding: '13px',
          backgroundColor: theme === THEME.LIGHT ? '#fff' : '#212E5A',
          color: theme === THEME.LIGHT ? '#212E5A' : '#D6DDFB',
        },
        autoClose: 3000,
        closeButton: false,
        position: 'bottom-left',
        transition: Flip,
      });
    });
  }, []);

  useEffect(() => {
    setMessage({
      ...props,
    });
  }, [setMessage]);

  return (
    <MessageCardWrapper>
      <MessageHeader>
        <HeaderImageWrapper>
          <Image
            src={message.anonymousUser.emoji.imageUrl}
            width={60}
            height={60}
          />
        </HeaderImageWrapper>
        <HeaderDescription>
          <HeaderDescriptionName>
            {message.anonymousUser.nickname}
          </HeaderDescriptionName>
          <HeaderDescriptionCountry>
            <Image
              src={message.anonymousUser.country.imageUrl}
              width={26}
              height={26}
              marginRight={8}
            />
            {message.anonymousUser.country.fullName}
          </HeaderDescriptionCountry>
        </HeaderDescription>
      </MessageHeader>
      <Contents>{message.content}</Contents>
      <MessageFooter>
        <LikeWrapper like={message.like}>
          <LikeButton onClick={clickLikeButton}>
            <Image
              src={
                message.like
                  ? '/images/heart-activate.svg'
                  : theme === THEME.LIGHT
                  ? '/images/heart-inactivate.svg'
                  : '/images/heart-inactivate-dark.svg'
              }
              width={38}
              height={32}
            />
            <LikeCountWrapper like={message.like}>
              {message.likeCount}
            </LikeCountWrapper>
          </LikeButton>
        </LikeWrapper>

        <ShareButton onClick={clickShareButton} />
      </MessageFooter>
    </MessageCardWrapper>
  );
};

export default MessageCardDetail;

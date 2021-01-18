import React from 'react';
import styled from 'styled-components';

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
  background: url(/images/message-bg.svg) no-repeat center;
  background-size: cover;
  margin-right: 12px;
`;

const HeaderDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderDescriptionName = styled.div`
  flex: 0 1 100%;
  color: #212e5a;
  font-weight: 700;
  font-size: 18px;
`;

const HeaderDescriptionCountry = styled.div`
  flex: 0 1 100%;
  color: #445282;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  display: flex;
`;

const Contents = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #212e5a;
  font-weight: 400;
  margin-bottom: 10px;
`;
const MessageFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessageHeart = styled.img`
  margin-right: 4px;
`;

const LikeWrapper = styled.div<{ like: boolean }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: ${props => (props.like ? '#fa3766' : '#d6ddfb')};
`;

const LikeButton = styled.button`
  flex: 0 0 48px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  background-size: cover;
  border-style: none;
`;

const ShareButton = styled.button`
  flex: 0 0 48px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(/images/share-bg.svg) no-repeat center;
  background-size: cover;
  border-style: none;
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
  return (
    <MessageCardWrapper>
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
                  : '/images/heart-inactivate.svg'
              }
            />
          </LikeButton>
          {props.likeCount}
        </LikeWrapper>

        <ShareButton>
          <img src="/images/share-icon.svg"></img>
        </ShareButton>
      </MessageFooter>
    </MessageCardWrapper>
  );
};

export default MessageCard;

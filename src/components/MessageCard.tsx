import React from 'react';
import styled from 'styled-components';

import Emoji from './Emoji';

const data = {
  uuid: '',
  anonymousUser: {
    id: 0,
    country: {
      id: 0,
      shortName: '',
      fullName: 'South Korea',
      image: '🇰🇷',
    },
    nickname: '철수',
    profileImage: '🍻',
  },
  content:
    '아이들의 쉬이 토끼, 어머님, 청춘이 그리워 벌레는 다 동경과 듯합니다. 언덕 때 슬퍼하는 이름을 둘 듯합니다. 나는 걱정도 계절이 가난한 멀리 어머님, 봅니다. 옥 것은 별을 봅니다. 것은 별 아이들의 별 밤을 아침이 불러 이런 어머니, 까닭입니다. 나는 어머니, 한 소학교 시인의 하늘에는 말 걱정도 밤이 듯합니다. 멀리 풀이 하늘에는 계십니다. 쓸쓸함과 파란 슬퍼하는 까닭입니다. 추억과 속의 내린 걱정도 벌레는 이름자 말 봅니다. 멀리 풀이 하늘에는 계십니다. 쓸쓸함과 파란 슬퍼하는 까닭입니다. 추억과 속의 내린 걱정도 벌레는 이름자 말 봅니다. 멀리 풀이 하늘에는 계십니다. 쓸쓸함과 파란 슬퍼하는 까닭입니다. 추억과 속의 내린 걱정도 벌레는 이름자 말 봅니다. 멀리 풀이 하늘에는 계십니다. 쓸쓸함과 파란 슬퍼하는 까닭입니다. 추억과 속의 내린 걱정도 벌레는 이름자 말 봅니다.',
  likeCount: 1234,
  createdAt: '2020-02-29T21:02:57.857214+00:00',
  like: true,
};

const MessageCardWrapper = styled.div`
  background: #fff;
  box-shadow: 0px 4px 10px 10px rgba(33, 46, 90, 0.02);
  border-radius: 30px;
  width: 380px;
  padding: 30px;
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
  background: url(/message-bg.svg) no-repeat center;
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
  background: url(share-bg.svg) no-repeat center;
  background-size: cover;
  border-style: none;
`;
const MessageCard = () => {
  return (
    <MessageCardWrapper>
      <MessageHeader>
        <HeaderImage>
          <Emoji code={data.anonymousUser.profileImage} />
        </HeaderImage>
        <HeaderDescription>
          <HeaderDescriptionName>
            {data.anonymousUser.nickname}
          </HeaderDescriptionName>
          <HeaderDescriptionCountry>
            <span style={{ marginRight: 5 }}>
              <Emoji code={data.anonymousUser.country.image} />
            </span>
            {data.anonymousUser.country.fullName}
          </HeaderDescriptionCountry>
        </HeaderDescription>
      </MessageHeader>
      <Contents>{data.content}</Contents>
      <MessageFooter>
        <LikeWrapper like={data.like}>
          <LikeButton>
            <MessageHeart
              src={data.like ? 'heart-activate.svg' : 'heart-inactivate.svg'}
            />
          </LikeButton>
          {data.likeCount}
        </LikeWrapper>

        <ShareButton>
          <img src="share-icon.svg"></img>
        </ShareButton>
      </MessageFooter>
    </MessageCardWrapper>
  );
};

export default MessageCard;

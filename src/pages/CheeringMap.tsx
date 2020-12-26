import React from 'react';
import styled from 'styled-components';

import PixelMap from '../components/PixelMap';

const CheeringMapWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
`;

const PixelMapWrapper = styled.div`
  margin-bottom: 30px;
`;

const CheerRankWRapper = styled.div`
  width: 230px;
  height: 340px;
  margin-bottom: 30px;
  padding: 20px 20px 20px 20px;
  border-radius: 25px;
  background-color: #e5eafe;
  font-size: 18px;
  font-weight: bold;
`;

const data = [
  {
    country: {
      id: 0,
      code: 'MC',
      fullName: '',
      emojiUnicode: '',
    },
    messageCount: 0,
    likeCount: 0,
    population: 0,
    level: 1,
  },
  {
    country: {
      id: 0,
      code: 'ES',
      fullName: '',
      emojiUnicode: '',
    },
    messageCount: 0,
    likeCount: 0,
    population: 0,
    level: 4,
  },
  {
    country: {
      id: 0,
      code: 'KR',
      fullName: '',
      emojiUnicode: '',
    },
    messageCount: 0,
    likeCount: 0,
    population: 0,
    level: 5,
  },
  {
    country: {
      id: 0,
      code: 'GB',
      fullName: '',
      emojiUnicode: '',
    },
    messageCount: 0,
    likeCount: 0,
    population: 0,
    level: 3,
  },
  {
    country: {
      id: 0,
      code: 'UA',
      fullName: '',
      emojiUnicode: '',
    },
    messageCount: 0,
    likeCount: 0,
    population: 0,
    level: 2,
  },
  {
    country: {
      id: 0,
      code: 'RU',
      fullName: '',
      emojiUnicode: '',
    },
    messageCount: 0,
    likeCount: 0,
    population: 0,
    level: 1,
  },
];

const CheeringMap = () => {
  return (
    <CheeringMapWrapper>
      <PixelMapWrapper>
        <PixelMap cellSize={9} countries={data} />
      </PixelMapWrapper>
      <CheerRankWRapper>Cheer Rank</CheerRankWRapper>
    </CheeringMapWrapper>
  );
};

export default CheeringMap;

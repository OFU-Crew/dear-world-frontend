import React from 'react';
import styled from 'styled-components';

import Emoji from '../Emoji';

const CheerRankWrapper = styled.div`
  border-radius: 10px;
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

const CheerRankTitle = styled.div`
  border-bottom: 3px solid #f4f7ff;
  color: #212e5a;
  padding: 16px 0 16px 20px;
`;

const CheerRankList = styled.div`
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  height: 90%;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 16px;
  row-gap: 10px;
`;

const CheerRankItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 8fr;
  column-gap: 10px;
`;

const CheerRankNumber = styled.div<{ index: number }>`
  font-style: italic;
  font-weight: bold;
  font-size: 11px;
  line-height: 13px;
  color: ${props => ([0, 1, 2].includes(props.index) ? '#20d7d7' : '442852')};
  text-align: center;
`;

const CheerRankCountry = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CountryName = styled.span`
  flex: 0 0 100%;
  font-size: 14px;
  line-height: 17px;
`;
const CountryMessageCount = styled.span`
  flex: 0 0 100%;
  font-size: 12px;
  line-height: 14px;
  font-weight: normal;
`;

const convertNumberToOrdinalNumber = (n: number) => {
  if (n === 1) return '1st';
  else if (n === 2) return '2nd';
  else if (n === 3) return '3rd';
  else return `${n}th`;
};

const CheerRank = ({
  countries,
}: {
  countries: {
    countryStatus: {
      id: number;
      level: number;
      likeCount: string;
      messageCount: number;
      population: string;
    };
    emojiUnicode: string;
    code: string;
    fullName: string;
    id: string;
  }[];
}) => {
  return (
    <CheerRankWrapper>
      <CheerRankTitle>Cheer Rank</CheerRankTitle>
      <CheerRankList>
        {countries.map((country, index) => (
          <CheerRankItem key={country.code}>
            <CheerRankNumber index={index}>
              {convertNumberToOrdinalNumber(index + 1)}
            </CheerRankNumber>
            <Emoji code={country.emojiUnicode} />
            <CheerRankCountry>
              <CountryName>{country.fullName}</CountryName>
              <CountryMessageCount>
                <img className="emoji" src="/message-icon.svg" />
                {`  ${country.countryStatus.messageCount}`}
              </CountryMessageCount>
            </CheerRankCountry>
          </CheerRankItem>
        ))}
      </CheerRankList>
    </CheerRankWrapper>
  );
};

export default CheerRank;

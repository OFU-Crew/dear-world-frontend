import React, { FC } from 'react';
import styled from 'styled-components';

import { CountryState } from '../../store';

const CheerRankWrapper = styled.div`
  border-radius: 10px;
  background-color: ${props => props.theme.backgroundColor.cheerRank};
  font-size: 20px;
  font-weight: bold;
`;

const CheerRankTitle = styled.div`
  padding: 16px 0 16px 20px;

  border-bottom: 3px solid ${props => props.theme.borderColor.cheerRank};
  color: ${props => props.theme.color.menu};

  ${({ theme }) => theme.media.mobile`
    font-size: 16px;
  `};
`;

const CheerRankList = styled.div`
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  height: 90%;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 16px;
  row-gap: 10px;

  ${({ theme }) => theme.media.mobile`
    padding-bottom: 10px;
    box-sizing: border-box;
  `};
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
  line-height: 18px;
  color: ${props =>
    [0, 1, 2].includes(props.index) ? '#20d7d7' : props.theme.color.menu};
  text-align: center;
`;

const CheerRankCountry = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CountryName = styled.div`
  flex: 0 0 100%;
  font-size: 14px;
  line-height: 17px;
  height: 10px;

  color: ${props => props.theme.color.menu};

  ${({ theme }) => theme.media.mobile`
    font-size: 12px;
    line-height: 18px;
    height: 20px;
  `}
`;
const CountryMessageCount = styled.span`
  flex: 0 0 100%;
  font-size: 13px;
  line-height: 15px;
  font-weight: normal;

  color: ${props => props.theme.color.cheerCount};

  ${({ theme }) => theme.media.mobile`
    font-size: 12px;
    line-height: 14px;
  `}
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

interface CheerRank {
  countries: CountryState[];
}

const convertNumberToOrdinalNumber = (n: number) => {
  if (n === 1) return '1st';
  else if (n === 2) return '2nd';
  else if (n === 3) return '3rd';
  else return `${n}th`;
};

const CheerRank: FC<CheerRank> = ({ countries }) => {
  return (
    <CheerRankWrapper>
      <CheerRankTitle>Cheer Rank</CheerRankTitle>
      <CheerRankList>
        {countries.map((country, index) => (
          <CheerRankItem key={country.code}>
            <CheerRankNumber index={index}>
              {convertNumberToOrdinalNumber(index + 1)}
            </CheerRankNumber>
            <Image src={country.imageUrl} width={20} height={20} />
            <CheerRankCountry>
              <CountryName>{country.fullName}</CountryName>
              <CountryMessageCount>
                <img className="emoji" src="/images/message-icon.svg" />
                {`   ${country.countryStatus!.messageCount}`}
              </CountryMessageCount>
            </CheerRankCountry>
          </CheerRankItem>
        ))}
      </CheerRankList>
    </CheerRankWrapper>
  );
};

export default CheerRank;

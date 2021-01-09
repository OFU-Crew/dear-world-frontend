import React, { Fragment } from 'react';
import styled from 'styled-components';

import maps from './maps';

const PixelMapWrapper = styled.div`
  grid-template-rows: repeat(52, 1fr);
  grid-template-columns: repeat(78, 1fr);
  display: grid;
  gap: 1px;
  width: 100%;
  height: 100%;
`;

const Cell = styled.div.attrs(({ x, y }: { x: number; y: number }) => ({
  style: {
    gridColumn: `${x}/${x}`,
    gridRow: `${y}/${y}`,
  },
}))<{ x: number; y: number; level: number }>`
  width: 85%;
  height: 85%;
  border-radius: 50%;
  background-color: ${props =>
    props.theme.backgroundColor[`level${props.level}`]};
`;

const PixelMap = ({
  countries,
}: {
  countries: {
    countryStatus: {
      id: number;
      level: number;
      likeCount: string;
      population: string;
    };
    emojiUnicode: string;
    code: string;
    fullName: string;
    id: string;
  }[];
}) => {
  return (
    <PixelMapWrapper>
      {maps.map(({ name, locations, countryId }) => {
        const level =
          countries.filter(item => item.code === countryId)[0]?.countryStatus
            .level ?? 0;

        return (
          <Fragment key={name}>
            {locations.map(({ x, y }) => (
              <Cell key={`${name}_${x}_${y}`} x={x} y={y} level={level} />
            ))}
          </Fragment>
        );
      })}
    </PixelMapWrapper>
  );
};
export default PixelMap;

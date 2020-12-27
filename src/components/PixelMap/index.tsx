import React, { Fragment } from 'react';
import styled from 'styled-components';

import maps from './maps';

const PixelMapWrapper = styled.div`grid-template-rows: repeat(52, 1fr);
grid-template-columns: repeat(78, 1fr);
display: grid;
gap: 1px;
justify-items: center;
align-items: center;
width: 100%;
height: 100%;
}`;

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
    country: {
      id: number;
      code: string;
      fullName: string;
      emojiUnicode: string;
    };
    messageCount: number;
    likeCount: number;
    population: number;
    level: number;
  }[];
}) => {
  return (
    <PixelMapWrapper>
      {maps.map(({ name, locations, countryId }) => {
        const level =
          countries.filter(item => item.country.code === countryId)[0]?.level ??
          0;

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

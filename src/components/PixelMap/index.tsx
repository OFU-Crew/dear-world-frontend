import React, { Fragment } from 'react';
import styled from 'styled-components';

import maps from './maps';

const PixelMapWrapper = styled.div<{
  cellSize: number;
}>`grid-template-rows: ${props => `repeat(52, ${props.cellSize}px)`};
grid-template-columns: ${props => `repeat(78, ${props.cellSize}px)`};
display: grid;
gap: 1px;
justify-items: center;
align-items: center;
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
  cellSize,
  countries,
}: {
  cellSize: number;
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
    <PixelMapWrapper cellSize={cellSize}>
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

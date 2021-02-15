import React, { FC, Fragment } from 'react';
import styled from 'styled-components';

import { CountryState } from '../../store';
import maps from './maps';

const PixelMapWrapper = styled.div`
  grid-template-rows: repeat(52, 1fr);
  grid-template-columns: repeat(78, 1fr);
  display: grid;
  gap: 1px;
  width: 100%;
  height: 45vw;
  max-height: 513px;
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

interface PixelMapProps {
  countries: CountryState[];
}

const PixelMap: FC<PixelMapProps> = ({ countries }) => {
  return (
    <PixelMapWrapper>
      {maps.map(({ name, locations, countryId }) => {
        const filteredCountries = countries.filter(
          item => item.code === countryId,
        );
        const level = filteredCountries.length
          ? filteredCountries[0].countryStatus!.level
          : 0;

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

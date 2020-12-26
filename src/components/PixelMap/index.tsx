import React, { useMemo } from 'react';

import maps from './maps';

//TODO: styled-component로 재작성
const appStyle = {
  display: 'grid',
  width: '100vh',
  height: '50vh',
  gap: '1px',
  justifyItems: 'center',
  aliginItems: 'center',
};

const Cell = ({
  name,
  x,
  y,
  color,
}: {
  name: string;
  x: number;
  y: number;
  color: string;
}) => {
  const cellStyle = useMemo(
    () => ({
      gridColumn: `${x}/${x}`,
      gridRow: `${y}/${y}`,
      width: '85%',
      height: '85%',
      backgroundColor: color,
      borderRadius: '50%',
    }),
    [x, y, color],
  );

  return <div id={name} style={cellStyle} />;
};

function PixelMap({ cellSize }: { cellSize: number }) {
  return (
    <div
      style={{
        ...appStyle,
        gridTemplateRows: `repeat(52, ${cellSize}px)`,
        gridTemplateColumns: `repeat(78, ${cellSize}px)`,
      }}
      id="map"
    >
      {maps.map(({ name, locations }) => {
        return (
          <>
            {locations.map(({ x, y }) => (
              <Cell
                key={`${name}_${x}_${y}`}
                name={name}
                x={x}
                y={y}
                color="#e5eafe"
              />
            ))}
          </>
        );
      })}
    </div>
  );
}
export default PixelMap;

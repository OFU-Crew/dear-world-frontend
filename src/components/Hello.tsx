import React from 'react';

interface HelloProps {
  name: string;
}

const Hello: React.FC<HelloProps> = props => {
  const { name } = props;

  return <p>{name} Hello</p>;
};

export default Hello;

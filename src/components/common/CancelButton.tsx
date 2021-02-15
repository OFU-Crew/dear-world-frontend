import React, { FC } from 'react';
import styled from 'styled-components';

const Cancel = styled.div<{ size: number }>`
  width: ${props => props.size * 5}px;
  height: ${props => props.size * 5}px;
  position: relative;
  border-radius: 6px;
  cursor: pointer;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: ${props => props.size * 4.1}px;
    height: 2px;
    background-color: ${props => props.theme.color.messageNickname};
    border-radius: 2px;
    top: 16px;
  }

  &:before {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
    left: 2px;
  }
  &:after {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
    right: 2px;
  }
`;

interface CancelButtonProps {
  onClick: () => void;
  size: number;
}

const CancelButton: FC<CancelButtonProps> = props => {
  return <Cancel size={props.size} onClick={props.onClick} />;
};

export default CancelButton;

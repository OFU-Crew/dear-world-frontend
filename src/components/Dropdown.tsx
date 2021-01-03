import React, { Children, FC, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { useOnClickOutside } from '../hooks';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ToggleButton = styled.button`
  height: 45px;
  padding: 0 42px 0 21px;
  border: 1px solid #999;
  font-family: inherit;
  font-size: 18px;
  font-weight: 700;
  text-align: left;
  margin-right: 20px;
  background: 14px 8px no-repeat url('/arrow.svg');
  background-position: bottom 50% right 18px;
  border-radius: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const SearchInput = styled.input`
  width: 242px;
  height: 38px;
  padding: 3px 12px;
  background: #f4f7ff;
  border: 0;
  border-radius: 20px;
  outline: 0;
  font-size: 18px;
  font-weight: bold;

  &::placeholder {
    color: #d6ddfb;
  }

  & + i {
    position: relative;
    z-index: 1;
    left: -25px;
    top: 1px;
    color: #445282;
    width: 0;
  }
`;

const SelectedItemWrapper = styled.div`
  width: 100%;
  border: 0;
  border-top: 1px solid #d6ddfb;
  border-bottom: 1px solid #d6ddfb;
`;

const ItemBox = styled.div`
  position: absolute;
  margin-top: 10px;
  max-width: 270px;
  min-width: 170px;
  background: #f4f7ff;
  border: 2px solid #d6ddfb;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const ItemText = styled.span``;

// const ItemCount;

const ItemList = styled.ul`
  max-width: 270px;
  max-height: 260px;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 10px;
`;

const Item = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 38px;
  padding: 3px 12px;
  background: #f4f7ff;
  border: 0;
  text-align: left;
  font-size: 18px;

  &.selected {
    color: #20d7d7;
    font-weight: bold;
  }
`;

interface ItemProps {
  id: number;
  code?: string;
  fullName: string;
  emojiUnicode?: string;
}

interface DropdownProps {
  type: 'contries' | 'ordering';
  items: Array<ItemProps>;
}

const Dropdown: FC<DropdownProps> = ({ items, type }) => {
  console.log(items);
  const buttonRef = useRef(null);
  const boxRef = useRef(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>(
    type === 'contries' ? 'Whole world' : items[0].fullName,
  );

  const isSelected = (name: string) => name === selectedItem;

  const handleClickItem = (event: any) => {
    setSelectedItem(event.target.innerHTML);
    setVisible(false);
  };

  const handleClickButton = () => {
    setVisible(prev => !prev);
  };

  const handleClickOutside = () => {
    setVisible(false);
  };

  useOnClickOutside([buttonRef, boxRef], handleClickOutside);

  return (
    <Wrapper>
      <ToggleButton ref={buttonRef} onClick={handleClickButton}>
        {selectedItem}
      </ToggleButton>
      {visible && (
        <ItemBox ref={boxRef}>
          {type === 'contries' && (
            <>
              <SearchInput placeholder="Search the country" />
              <i className="fas fa-search"></i>
              <SelectedItemWrapper>
                <Item className="selected" onClick={handleClickItem}>
                  {selectedItem}
                </Item>
              </SelectedItemWrapper>
            </>
          )}
          <ItemList onClick={handleClickItem}>
            {type === 'contries' && !isSelected('Whole world') && (
              <Item className={isSelected('Whole world') ? 'selected' : ''}>
                Whole world
              </Item>
            )}
            {items.map(item => (
              <li key={item.id}>
                <Item className={isSelected(item.fullName) ? 'selected' : ''}>
                  {item.fullName}
                </Item>
              </li>
            ))}
          </ItemList>
        </ItemBox>
      )}
    </Wrapper>
  );
};

export default Dropdown;

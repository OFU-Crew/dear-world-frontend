import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useOnClickOutside } from '../../hooks';

const ITEM_HEIGHT = 38;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const ToggleButton = styled.button`
  height: 45px;
  padding: 0 42px 0 21px;
  border: 2px solid ${props => props.theme.borderColor.filter};
  font-family: inherit;
  font-size: 18px;
  font-weight: 700;
  text-align: left;
  margin-right: 20px;
  background: 14px 8px no-repeat url(${props => props.theme.url.filterArrow});
  background-position: bottom 50% right 18px;
  border-radius: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  color: ${props => props.theme.color.filter};
`;

const ItemBox = styled.div`
  position: absolute;
  margin-top: 10px;
  max-width: 270px;
  min-width: 170px;
  border: 2px solid ${props => props.theme.borderColor.filter};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  border-radius: 10px;

  visibility: hidden;
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;

  background: ${props => props.theme.backgroundColor.filter};

  &.active {
    visibility: visible;
    opacity: 1;
    transform: translateY(0px);
  }
`;

const ItemList = styled.ul`
  max-width: 270px;
  max-height: 260px;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 20px;
`;

const WholeWorldItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 38px;
  padding: 3px 12px;
  border: 0;
  text-align: left;
  font-size: 18px;

  height: 45px;
  border-top: 1px solid ${props => props.theme.borderColor.filter};
  border-bottom: 1px solid ${props => props.theme.borderColor.filter};

  color: ${props => props.theme.color.filter};
  background: ${props => props.theme.backgroundColor.filter};

  &.selected {
    color: ${props => props.theme.color.selectedFilterItem};
    font-weight: bold;
  }
`;

const Item = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 38px;
  padding: 3px 12px;
  border: 0;
  text-align: left;
  font-size: 18px;

  color: ${props => props.theme.color.filter};
  background: ${props => props.theme.backgroundColor.filter};

  &.selected {
    color: ${props => props.theme.color.selectedFilterItem};
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
  type: string;
  items: ItemProps[];
  onClickItem?: (country: string) => void;
}

const Dropdown: FC<DropdownProps> = ({
  children,
  type,
  items,
  onClickItem,
}) => {
  const buttonRef = useRef(null);
  const boxRef = useRef(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<number>(0);
  const [selectedItemTitle, setSelectedItemTitle] = useState<string>(
    type === 'countries' ? 'Whole world' : items[0].fullName,
  );

  const isSelected = (id: number) => id === selectedItemId;

  const handleClickItem = (event: any) => {
    const {
      dataset: { id },
      innerHTML: title,
    } = event.target;

    setVisible(false);
    setSelectedItemTitle(title);
    onClickItem && onClickItem(title);

    setTimeout(() => {
      setSelectedItemId(parseInt(id, 10));

      if (listRef.current) {
        listRef.current.scrollTop = (id - 1) * ITEM_HEIGHT - 3;
      }
    }, 200);
  };

  const handleClickButton = () => {
    setVisible(prev => !prev);

    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTop = (selectedItemId - 1) * ITEM_HEIGHT - 3;
      }
    }, 200);
  };

  const handleClickOutside = () => {
    setVisible(false);

    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTop = (selectedItemId - 1) * ITEM_HEIGHT - 3;
      }
    }, 200);
  };

  useOnClickOutside([buttonRef, boxRef], handleClickOutside);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [items]);

  return (
    <Wrapper>
      <ToggleButton ref={buttonRef} onClick={handleClickButton}>
        {selectedItemTitle}
      </ToggleButton>
      <ItemBox ref={boxRef} className={visible ? 'active' : 'unactive'}>
        {children}
        {type === 'countries' && (
          <WholeWorldItem
            className={isSelected(0) ? 'selected' : ''}
            data-id={0}
            onClick={handleClickItem}
          >
            Whole world
          </WholeWorldItem>
        )}
        <ItemList ref={listRef} onClick={handleClickItem}>
          {items.map(item => (
            <li key={item.id}>
              <Item
                className={isSelected(item.id) ? 'selected' : ''}
                data-id={item.id}
              >
                {item.fullName}
              </Item>
            </li>
          ))}
        </ItemList>
      </ItemBox>
    </Wrapper>
  );
};

export default Dropdown;

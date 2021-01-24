import React, {
  ChangeEvent,
  FC,
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { useOnClickOutside } from '../../hooks';
import { CountryState, OrderingState } from '../../store';

const ITEM_HEIGHT = 46;

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
  max-width: 280px;
  min-width: 170px;
  border: 2px solid ${props => props.theme.borderColor.filter};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  z-index: 1;

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
  max-width: 280px;
  max-height: 260px;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 20px;
`;

const SearchInput = styled.input`
  width: 280px;
  height: 45px;
  padding: 3px 12px;
  border: 0;
  border-radius: 20px;
  outline: 0;
  font-size: 18px;
  font-weight: bold;
  box-sizing: border-box;

  color: ${props => props.theme.color.filter};
  background: ${props => props.theme.backgroundColor.filter};

  &::placeholder {
    color: ${props => props.theme.color.search};
  }

  & + i {
    position: relative;
    z-index: 1;
    left: -25px;
    color: ${props => props.theme.color.search};
    width: 0;
  }
`;

const WholeWorldItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 3px 12px;
  border: 0;
  text-align: left;
  font-size: 17px;

  height: 48px;
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
  height: 46px;
  padding: 3px 12px;
  border: 0;
  text-align: left;
  font-size: 17px;

  color: ${props => props.theme.color.filter};
  background: ${props => props.theme.backgroundColor.filter};

  &.selected {
    color: ${props => props.theme.color.selectedFilterItem};
    font-weight: bold;
  }
`;

type ItemType = CountryState | OrderingState;

interface DropdownProps {
  wholeItem?: boolean;
  searchBar?: boolean;
  selectedItem?: ItemType | undefined;
  items: ItemType[];
  onClickItem?: (country: string) => void;
  // setSearchValue?: () => void;
}

const Dropdown: FC<DropdownProps> = ({
  searchBar,
  wholeItem,
  selectedItem,
  items,
  onClickItem,
}) => {
  const buttonRef = useRef(null);
  const boxRef = useRef(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchValue, setSearchValue] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<number>(
    selectedItem ? selectedItem.id : 0,
  );
  const [selectedItemTitle, setSelectedItemTitle] = useState<string>(
    selectedItem ? selectedItem.fullName : 'Whole world',
  );
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(
    selectedItem ? selectedItem.id : 0,
  );

  const isSelected = (id: number) => id === selectedItemId;

  const handleClickItem = (event: any) => {
    const { innerHTML: title } = event.target;

    setVisible(false);
    setSelectedItemTitle(title);
    onClickItem && onClickItem(title);
    setSearchValue('');
    setFilteredItems(items);

    const index = items.findIndex(item => item.fullName === title);

    setTimeout(() => {
      setSelectedItemIndex(index + 1);
      items[index] && setSelectedItemId(items[index].id);

      if (listRef.current) {
        listRef.current.scrollTop = index * ITEM_HEIGHT - 3;
      }
    }, 200);
  };

  const handleClickButton = () => {
    setVisible(prev => !prev);
    setSearchValue('');
    setFilteredItems(items);

    setTimeout(() => {
      if (inputRef && inputRef.current) {
        inputRef.current!.focus();
      }
    }, 200);

    setTimeout(() => {
      const index = items.findIndex(
        item => item.fullName === selectedItem?.fullName,
      );
      if (listRef.current) {
        listRef.current.scrollTop = index * ITEM_HEIGHT - 3;
      }
    }, 300);
  };

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const exp = new RegExp(value, 'gi');
    const filteredItems = items.filter((item: ItemType) =>
      item.fullName.match(exp),
    );

    setSearchValue(value);
    setFilteredItems(filteredItems);
  };

  const handleClickOutside = () => {
    setVisible(false);

    setTimeout(() => {
      setSearchValue('');
      setFilteredItems(items);
      const index = items.findIndex(
        item => item.fullName === selectedItem?.fullName,
      );
      if (listRef.current) {
        listRef.current.scrollTop = index * ITEM_HEIGHT - 3;
      }
    }, 200);
  };

  useOnClickOutside([buttonRef, boxRef], handleClickOutside);

  useEffect(() => {
    setSelectedItemId(selectedItem ? selectedItem.id : 0);
    setSelectedItemTitle(selectedItem ? selectedItem.fullName : 'Whole world');

    const index = items.findIndex(
      item => item.fullName === selectedItem?.fullName,
    );
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTop = index * ITEM_HEIGHT - 3;
      }
    }, 200);
  }, [selectedItem]);

  return (
    <Wrapper>
      <ToggleButton ref={buttonRef} onClick={handleClickButton}>
        {selectedItemTitle}
      </ToggleButton>
      <ItemBox ref={boxRef} className={visible ? 'active' : 'unactive'}>
        {searchBar && (
          <Fragment>
            <SearchInput
              ref={inputRef}
              placeholder="Search the country"
              value={searchValue}
              onChange={onChangeValue}
            />
            <i className="fas fa-search"></i>
          </Fragment>
        )}
        {wholeItem && (
          <WholeWorldItem
            className={isSelected(0) ? 'selected' : ''}
            onClick={handleClickItem}
          >
            Whole world
          </WholeWorldItem>
        )}
        <ItemList ref={listRef} onClick={handleClickItem}>
          {filteredItems.map((item: ItemType) => (
            <li key={item.id}>
              <Item className={isSelected(item.id) ? 'selected' : ''}>
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

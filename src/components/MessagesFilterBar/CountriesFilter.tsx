import React, { FC, Suspense, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { countriesSelector } from '../../store';
import Dropdown, { ToggleButton } from '../common/Dropdown';

const SearchInput = styled.input`
  width: 242px;
  height: 38px;
  padding: 3px 12px;
  border: 0;
  border-radius: 20px;
  outline: 0;
  font-size: 18px;
  font-weight: bold;

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

const AsyncCountriesFilter: FC = () => {
  const countries = useRecoilValue(countriesSelector);
  const history = useHistory();
  const ordering = new URLSearchParams(useLocation().search).get('ordering');

  const onClickItem = (country: string) => {
    country = country.replace(/ /gi, '-');
    history.push({
      pathname: '',
      search: `countries=${country}&ordering=${ordering}`,
    });
  };

  return (
    <Dropdown type="countries" items={countries} onClickItem={onClickItem}>
      <React.Fragment>
        <SearchInput placeholder="Search the country" />
        <i className="fas fa-search"></i>
      </React.Fragment>
    </Dropdown>
  );
};

const CountriesFilter: FC = () => {
  return (
    <Suspense fallback={<ToggleButton>Whole world</ToggleButton>}>
      <AsyncCountriesFilter />
    </Suspense>
  );
};

export default CountriesFilter;

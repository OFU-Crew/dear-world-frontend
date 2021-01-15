import React, { ChangeEvent, FC, Suspense, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { countriesSelector, CountryProps } from '../../store';
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
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const ordering = new URLSearchParams(useLocation().search).get('ordering');

  const onClickItem = (country: string) => {
    country = country.replace(/ /gi, '-');
    history.push({
      pathname: '',
      search: `countries=${country}&ordering=${ordering}`,
    });
  };

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = new RegExp(value, 'gi');
    const newCountries = countries.filter((country: CountryProps) =>
      regex.test(country.fullName),
    );

    setSearchValue(value);
    setFilteredCountries(newCountries);
  };

  return (
    <Dropdown
      type="countries"
      items={filteredCountries}
      onClickItem={onClickItem}
    >
      <React.Fragment>
        <SearchInput
          placeholder="Search the country"
          value={searchValue}
          onChange={onChangeValue}
        />
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

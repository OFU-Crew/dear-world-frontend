import React, { FC, Suspense, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useSearchParams } from '../../hooks';
import {
  countriesQueryState,
  countriesSelector,
  CountryState,
  decodeURI,
  encodeURI,
  selectedCountryAtom,
} from '../../store';
import Dropdown, { ToggleButton } from '../common/Dropdown';

interface CountriesFilterProps {
  countriesQuery: string;
  orderingQuery: string;
  countries: CountryState[];
}

const AsyncCountriesFilter: FC<CountriesFilterProps> = ({
  countriesQuery,
  orderingQuery,
  countries,
}) => {
  const history = useHistory();
  const [selectedCountry, setSelectedCountry] = useRecoilState(
    selectedCountryAtom,
  );

  const onClickItem = (country: string) => {
    country = encodeURI(country);
    history.push({
      pathname: '',
      search: `countries=${country}&ordering=${orderingQuery}`,
    });
  };

  useEffect(() => {
    const selectedCountry = countries.find(
      (country: CountryState) => country.fullName === decodeURI(countriesQuery),
    );

    setSelectedCountry(selectedCountry!);
  }, [countriesQuery]);

  return (
    <Dropdown
      wholeItem
      searchBar
      selectedItem={selectedCountry}
      items={countries}
      onClickItem={onClickItem}
    />
  );
};

const CountriesFilter: FC<CountriesFilterProps> = props => {
  const countriesQuery = useRecoilValue(countriesQueryState);

  return (
    <Suspense
      fallback={<ToggleButton>{decodeURI(countriesQuery)}</ToggleButton>}
    >
      <AsyncCountriesFilter {...props} />
    </Suspense>
  );
};

export default CountriesFilter;

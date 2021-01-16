import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { countriesQueryState, orderingQueryState } from '../store';

export const useSearchParams = () => {
  const location = useLocation();
  const setCountriesQueryState = useSetRecoilState(countriesQueryState);
  const setOrderingQueryState = useSetRecoilState(orderingQueryState);

  useEffect(() => {
    const countriesQuery = new URLSearchParams(location.search).get(
      'countries',
    );
    const orderingQuery = new URLSearchParams(location.search).get('ordering');

    setCountriesQueryState(countriesQuery || 'Whole world');
    setOrderingQueryState(orderingQuery || 'Recent');
  }, [location.search]);
};

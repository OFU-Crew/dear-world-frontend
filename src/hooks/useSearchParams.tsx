import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { countriesQueryState, orderingQueryState } from '../store';

export const useSearchParams = () => {
  const location = useLocation();
  const setCountriesQuery = useSetRecoilState(countriesQueryState);
  const setOrderingQuery = useSetRecoilState(orderingQueryState);

  useEffect(() => {
    const countriesQuery = new URLSearchParams(location.search).get(
      'countries',
    );
    const orderingQuery = new URLSearchParams(location.search).get('ordering');

    setCountriesQuery(countriesQuery || 'Whole world');
    setOrderingQuery(orderingQuery || 'Recent');
  }, [location.search]);
};

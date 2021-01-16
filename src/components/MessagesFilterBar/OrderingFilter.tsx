import React, { FC, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {
  countriesQueryState,
  encodeURI,
  OrderingProps,
  orderingQueryState,
} from '../../store';
import Dropdown from '../common/Dropdown';

const OrderingFilter: FC = () => {
  const orderings = [
    { id: 0, fullName: 'Recent' },
    { id: 1, fullName: 'Weekly HOT' },
  ];
  const history = useHistory();
  const countryQuery = useRecoilValue(countriesQueryState);
  const orderingQuery = useRecoilValue(orderingQueryState);
  const initialOrdering = orderings.find(
    (ordering: OrderingProps) => encodeURI(ordering.fullName) === orderingQuery,
  );

  const onClickItem = (ordering: string) => {
    ordering = encodeURI(ordering);
    history.push({
      pathname: '',
      search: `countries=${countryQuery}&ordering=${ordering}`,
    });
  };

  return (
    <Dropdown
      type="ordering"
      initialItem={initialOrdering}
      items={orderings}
      onClickItem={onClickItem}
    />
  );
};

export default OrderingFilter;

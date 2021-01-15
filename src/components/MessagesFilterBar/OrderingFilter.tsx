import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Dropdown from '../common/Dropdown';

const OrderingFilter: FC = () => {
  const ordering = [
    { id: 0, fullName: 'Recent' },
    { id: 1, fullName: 'Weekly HOT' },
  ];
  const history = useHistory();
  const country = new URLSearchParams(useLocation().search).get('countries');

  const onClickItem = (ordering: string) => {
    ordering = ordering.replace(/ /gi, '-');
    history.push({
      pathname: '',
      search: `countries=${country}&ordering=${ordering}`,
    });
  };

  return (
    <Dropdown type="ordering" items={ordering} onClickItem={onClickItem} />
  );
};

export default OrderingFilter;

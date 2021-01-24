import React, { FC, Suspense, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { decodeURI, encodeURI, OrderingState } from '../../store';
import Dropdown, { ToggleButton } from '../common/Dropdown';

const orderings = [
  { id: 0, fullName: 'Recent' },
  { id: 1, fullName: 'Weekly HOT' },
];

interface OrderingFilterProps {
  countriesQuery: string;
  orderingQuery: string;
}

const OrderingFilter: FC<OrderingFilterProps> = ({
  countriesQuery,
  orderingQuery,
}) => {
  const history = useHistory();
  const [selectedOrdering, setSelectedOrdering] = useState<OrderingState>({
    id: 0,
    fullName: orderingQuery,
  });

  const onClickItem = (ordering: string) => {
    ordering = encodeURI(ordering);
    history.push({
      pathname: '',
      search: `countries=${countriesQuery}&ordering=${ordering}`,
    });
  };

  useEffect(() => {
    const selectedOrdering = orderings.find(
      (ordering: OrderingState) =>
        ordering.fullName === decodeURI(orderingQuery),
    );

    setSelectedOrdering(selectedOrdering!);
  }, [orderingQuery]);

  return (
    <Suspense fallback={<ToggleButton>Recent</ToggleButton>}>
      <Dropdown
        selectedItem={selectedOrdering}
        items={orderings}
        onClickItem={onClickItem}
      />
    </Suspense>
  );
};

export default OrderingFilter;

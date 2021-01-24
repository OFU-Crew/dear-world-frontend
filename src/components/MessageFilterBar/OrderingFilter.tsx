import React, { FC, Suspense, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSearchParams } from '../../hooks';
import { decodeURI, encodeURI, OrderingState } from '../../store';
import Dropdown, { ToggleButton } from '../common/Dropdown';

const orderings = [
  { id: 0, fullName: 'Recent' },
  { id: 1, fullName: 'Weekly HOT' },
];

const OrderingFilter: FC = () => {
  const history = useHistory();
  const [countryQuery, orderingQuery] = useSearchParams();
  const [selectedOrdering, setSelectedOrdering] = useState<OrderingState>({
    id: 0,
    fullName: orderingQuery,
  });

  const onClickItem = (ordering: string) => {
    ordering = encodeURI(ordering);
    history.push({
      pathname: '',
      search: `countries=${countryQuery}&ordering=${ordering}`,
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

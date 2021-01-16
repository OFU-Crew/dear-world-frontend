import React, { FC, Suspense, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Layout, MessageCard, MessageFilterBar } from '../components';
import { useSearchParams } from '../hooks';
import {
  countriesState,
  CountryProps,
  decodeURI,
  selectedCountryState,
} from '../store';

const DearWorld: FC = () => {
  useSearchParams();

  return (
    <Layout>
      <MessageFilterBar />
      <MessageCard />
    </Layout>
  );
};

export default DearWorld;

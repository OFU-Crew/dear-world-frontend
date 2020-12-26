// src/styles/styled.d.ts
import 'styled-components';

import { THEME } from '../hooks/useTheme';

export interface Media {
  mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
  tablet: (...args: BackQuoteArgs) => CSSProp | undefined;
  desktop: (...args: BackQuoteArgs) => CSSProp | undefined;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColor: {
      first: string;
      secondary: string;
    };
    color: {
      first: string;
      secondary: string;
    };
    borderColor: string;
    media: Media;
  }
}

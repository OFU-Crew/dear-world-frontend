// src/styles/styled.d.ts
import 'styled-components';

import { THEME } from '../hooks';

export interface Media {
  desktop: (...args: BackQuoteArgs) => CSSProp | undefined;
  mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColor: Record<string, string>;
    color: Record<string, string>;
    borderColor: Record<string, string>;
    url: Record<string, string>;
    media: Media;
  }
}

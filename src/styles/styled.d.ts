// src/styles/styled.d.ts
import 'styled-components';

import { THEME } from '../hooks/useTheme';

declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColor: Record<string, string>;

    color: {
      first: string;
      secondary: string;
    };
    borderColor: string;
  }
}

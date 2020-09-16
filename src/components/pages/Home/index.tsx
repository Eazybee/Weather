import React from 'react';
import styled from 'styled-components';
import { ThemeType } from '<hooks>/useTheme';


const HomePage = () => (
  <HomePage.Style>
    <h1>HomePage</h1>
  </HomePage.Style>
);

HomePage.Style = styled.section`
  h1 {
    ${({ theme }: Prop) => `
      color: ${theme.colors?.textColor};
      background-color: ${theme.colors?.primary};
    `}
  }
`;

type Prop = {
  theme: ThemeType;
};
export default HomePage;

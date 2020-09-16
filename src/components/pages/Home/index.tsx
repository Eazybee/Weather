import React from 'react';
import styled from 'styled-components';
import { ThemeType } from '<hooks>/useTheme';
import Header from '<components>/resuableSections/Header';


const HomePage = () => (
  <HomePage.Style>
    <Header />
  </HomePage.Style>
);

HomePage.Style = styled.section`
`;

type Prop = {
  theme: ThemeType;
};
export default HomePage;

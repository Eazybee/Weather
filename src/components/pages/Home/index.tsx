import React from 'react';
import styled from 'styled-components';
import Cities from '<components>/resuableSections/Cities';

const HomePage = () => (
  <HomePage.Style>
    <Cities />
  </HomePage.Style>
);

HomePage.Style = styled.section``;

export default HomePage;

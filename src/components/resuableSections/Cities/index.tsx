import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Input from '<components>/ui/Input';
import CardList from '<components>/ui/CardList';
import { CitiesContext, ActionType } from '<contexts>/Cities';
import { Props as CardProps } from '<components>/ui/Card';
import styles from './styled.css';

const Cities = () => {
  const { state: citiesState, dispatch } = useContext(CitiesContext);
  const history = useHistory();

  const favCitiesProp: CardProps[] = [];
  const citiesProp: CardProps[] = [];

  citiesState.forEach(({ favorite, current, location }, index: number) => {
    const city = {
      favorite,
      name: location.name,
      temperature: current.temperature,
      imgScr: current.weather_icon,
      imgAlt: current.weather_description,
      onClick: () => history.push('/info', { index }),
      handleLike: () => dispatch({ type: ActionType.TOOGLE_FAVORITE, payload: { index } }),
      handleDelete: () => dispatch({ type: ActionType.DELETE, payload: { index } }),
    };

    citiesProp?.push(city);

    if (favorite) {
      favCitiesProp.push(city);
    }
  });

  return (
    <Cities.Style>
      <div className={`search ${!favCitiesProp?.length ? 'full' : ''}`}>
        <Input />
      </div>

      <div className={`fle ${!favCitiesProp?.length ? 'full' : ''}`}>
        {favCitiesProp?.length ? (
          <div>
            <h1>Favorites</h1>
            <CardList cards={favCitiesProp} direction="row" width="fraction" />
          </div>
        ) : null}
        {citiesProp.length ? (
          <div className={`${favCitiesProp?.length ? 'col' : ''}`}>
            <h1>Other Cities</h1>
            <CardList cards={citiesProp} direction={favCitiesProp?.length ? 'column' : 'row'} />
          </div>
        ) : null}
      </div>
    </Cities.Style>
  );
};

Cities.Style = styled.section`
  ${styles}
`;

export default Cities;

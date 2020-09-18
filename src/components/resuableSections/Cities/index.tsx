import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Input from '<components>/ui/Input';
import CardList from '<components>/ui/CardList';
import { CitiesContext, ActionType } from '<contexts>/Cities';
import { Props as CardProps } from '<components>/ui/Card';

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
      imgScr: current.weather_icons[0],
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
            <h1>Favorite</h1>
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
  padding: 0 5rem;

  div.search {
    width: 75%;
    padding: 3vh 1rem;
    transition: width 0.5s;
  }
  div.fle {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    height: 30vh;
    align-items: flex-end;

    > div {
      display: flex;
      flex-flow: column;
      width: 75%;
      transition: width 0.5s;

      &.col {
        width: 23%;
        height: 45vh;
        right: 1rem;
        h1 {
          color: #ffffff;
          margin-left: 1rem;
          text-shadow: 1px 1px 1px #000000;
        }
      }
    }
  }

  div.full.search,
  div.full.fle > div {
    width: 100%;
  }

  @media screen and (max-width: 1000px) {
    padding: 0 1rem;
  }

  @media screen and (max-width: 880px) {
    div.search {
      width: 100%;
    }
    div.fle {
      flex-flow: column;
      align-items: normal;

      > div {
        margin: 1rem 0;
        width: 100%;

        &.col {
          height: fit-content;
          position: static;
          bottom: 13vh;
          width: 100%;

          h1 {
            color: #000000;
            text-shadow: none;
            margin-left: 0;
          }
        }
      }
    }
  }
`;

export default Cities;

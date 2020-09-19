/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { CitiesContext } from '<contexts>/Cities';
import { HeaderContext } from '<contexts>/Header';
import Table from '<components>/resuableSections/Table';
import Notes from '<components>/resuableSections/Notes/Notes';
import { City } from '<helpers>/typings';

const InfoPage = () => {
  const [state, setState] = useState<Record<string, any>>();
  const browserLocation = useLocation();
  const { setHeader } = useContext(HeaderContext);
  const { state: citiesState, dispatch } = useContext(CitiesContext);
  const history = useHistory();

  useEffect(() => {
    const {
      // @ts-ignore
      index,
      location,
      current,
    } = browserLocation.state as { index: number } & City;

    let myIndex;
    if (index !== null && !Number.isNaN(Number(index)) && citiesState[index]) {
      myIndex = index;
    } else if (current && location) {
      for (let i = 0; i < citiesState.length; i += 1) {
        const { location: tempLocation } = citiesState[i];
        if (
          tempLocation.name === location.name
          && tempLocation.region === location.region
          && tempLocation.country === location.country
        ) {
          myIndex = i;
          break;
        }
      }
    }

    if (myIndex !== undefined && !Number.isNaN(Number(myIndex))) {
      const info = citiesState[myIndex];
      const { weather_icons, weather_descriptions, ...rest } = info.current;

      setState({
        data: {
          ...rest,
          weather_descriptions: weather_descriptions.join(','),
        },
        index: myIndex,
        notes: info.notes,
      });
      setHeader((e) => ({
        ...e,
        homeCity: {
          current: info.current,
          location: info.location,
        },
      }));
    } else {
      history.push('/');
    }
  }, [browserLocation.state, citiesState, history, setHeader]);

  return (
    <InfoPage.Style>
      {state && (
        <>
          <Table data={state.data} />
          <div className="foot">
            <Notes notes={state.notes} cityIndex={state.index} dispatch={dispatch} />
          </div>
        </>
      )}
    </InfoPage.Style>
  );
};

InfoPage.Style = styled.section`
  padding: 1rem 5rem;

  .foot {
    padding: 1rem 0;
    margin-top: 4rem;
  }

  @media screen and (max-width: 1000px) {
    padding: 0 1rem;
  }
`;

export default InfoPage;

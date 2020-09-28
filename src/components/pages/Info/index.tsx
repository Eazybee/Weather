/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { CitiesContext } from '<contexts>/Cities';
import { HeaderContext } from '<contexts>/Header';
import Table from '<components>/resuableSections/Table';
import Notes from '<components>/resuableSections/Notes';
import { City } from '<helpers>/typings';
import styles from './styled.css';
import LoadingSpinner from '<components>/ui/LoadingSpinner';


const InfoPage = () => {
  const [state, setState] = useState<Record<string, any>>();
  const browserLocation = useLocation();
  const { setHeader } = useContext(HeaderContext);
  const { state: citiesState, dispatch } = useContext(CitiesContext);
  const history = useHistory();


  useEffect(() => {
    (async () => {
      let myIndex: number;

      if (browserLocation.state) {
        const {
          // @ts-ignore
          index, location, current,
        } = browserLocation?.state as { index: number } & City;


        if (index !== null && !Number.isNaN(Number(index))) {
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
      }

      // @ts-ignore
      if (myIndex !== undefined && !Number.isNaN(Number(myIndex))) {
        const info = citiesState[myIndex];
        if (info) {
          const { weather_icon, weather_description, ...rest } = info.current;

          setState({
            data: {
              ...rest,
              weather_description,
            },
            index: myIndex,
            notes: info.notes,
          });
          setHeader((e) => ({
            ...e,
            homeCity: {
              current: info.current,
              location: info.location,
              favorite: info.favorite,
              index: myIndex,
            },
          }));
        }
      } else {
        history.push('/');
      }
    })();
  }, [browserLocation.state, citiesState, history, setHeader]);

  return (
    <InfoPage.Style>
      {state ? (
        <>
          <Table data={state.data} />
          <div className="foot">
            <Notes notes={state.notes} cityIndex={state.index} dispatch={dispatch} />
          </div>
        </>
      ) : <LoadingSpinner />}
    </InfoPage.Style>
  );
};

InfoPage.Style = styled.section`
  ${styles}
`;

export default InfoPage;

import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Degree from '<components>/ui/Degree';
import SunnyDay from '<assests>/images/sunny.jpg';
import WinterDay from '<assests>/images/winter.jpg';
import CloudyDay from '<assests>/images/cloudy.jpg';
import RainyDay from '<assests>/images/rainy.jpg';
import LazyLoader from '<components>/ui/LazyLoad';
import Loading from '<components>/ui/LoadingSpinner';
import { HeaderContext } from '<contexts>/Header';
import { HeadCity } from '<helpers>/typings';
import styles from './styled.css';

const Header = () => {
  const [state, setState] = useState<HeadCity & { imgSrc?: any }>();
  const { state: headerState } = useContext(HeaderContext);

  useEffect(() => {
    let imgSrc;

    if (headerState.homeCity) {
      const { location, current, ...rest } = headerState.homeCity;
      if (location && current) {
        if (current.humidity >= 94) {
          imgSrc = RainyDay;
        } else if (current.temperature <= 19) {
          imgSrc = WinterDay;
        } else if (current.temperature > 19 && current.temperature <= 24) {
          imgSrc = RainyDay;
        } else if (current.temperature > 24 && current.temperature <= 29) {
          imgSrc = CloudyDay;
        } else {
          imgSrc = SunnyDay;
        }
        setState({
          current,
          location,
          imgSrc,
          ...rest,
        });
      }
    }
  }, [headerState]);

  return (
    <Header.Style>
      <div className="bg">
        <LazyLoader imgSrc={state?.imgSrc || SunnyDay} alt="" />
      </div>
      <div className="content">
        {!state ? (
          <Loading height={100} />
        ) : (
          <div className="left">
            <div>
              <div>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <div className="location">
                  <p className="city">{state.location.name}</p>
                  <p className="country">{state.location.country}</p>
                </div>
              </div>
              <div className="deg">
                <img src={state.current.weather_icon} alt={state.current.weather_description} />
                <Degree size="3rem" cSize="1.3rem" bottom="1.4rem">
                  {state.current.temperature}
                </Degree>
              </div>
            </div>
          </div>
        )}
        <div className="right">
          <h1>Weather</h1>
        </div>
      </div>
    </Header.Style>
  );
};

Header.Style = styled.section`
  ${styles}
`;

export default Header;

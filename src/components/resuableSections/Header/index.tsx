import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regHeart } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

import Degree from '<components>/ui/Degree';
import SunnyDay from '<assests>/images/sunny.jpg';
import WinterDay from '<assests>/images/winter.jpg';
import CloudyDay from '<assests>/images/cloudy.jpg';
import RainyDay from '<assests>/images/rainy.jpg';
import LazyLoader from '<components>/ui/LazyLoad';
import Loading from '<components>/ui/LoadingSpinner';
import { HeaderContext } from '<contexts>/Header';
import { CitiesContext, ActionType } from '<contexts>/Cities';
import { HeadCity } from '<helpers>/typings';
import styles from './styled.css';
import useNetwork from '<hooks>/useNetwork';


const Header = () => {
  const browserLocation = useLocation();
  const [state, setState] = useState<HeadCity & { imgSrc?: any }>();
  const { state: headerState } = useContext(HeaderContext);
  const { dispatch } = useContext(CitiesContext);
  const isOnline = useNetwork();
  const isHomePage = browserLocation.pathname === '/';


  useEffect(() => {
    let imgSrc;

    if (headerState.homeCity) {
      const { location, current, ...rest } = headerState.homeCity;
      if (location && current) {
        if (current.temperature <= 19) {
          imgSrc = WinterDay;
        } else if (
          current.humidity >= 94
          || current.weather_description.toLowerCase().includes('rain')
        ) {
          imgSrc = RainyDay;
        } else if (current.weather_description.toLowerCase().includes('cloud')) {
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

  const like = () => {
    const index = state?.index;
    console.log(index);
    dispatch({ type: ActionType.TOOGLE_FAVORITE, payload: { index } });
  };

  return (
    <Header.Style>
      <div className="bg">
        <LazyLoader imgSrc={state?.imgSrc || SunnyDay} alt="" />
      </div>
      <div className="content">
        <div className={`nav ${!isOnline ? 'offline' : ''}`}>
          <Link to="/"> Home </Link>
          {!isOnline ? <div>You are offline</div> : null}
        </div>
        <div className="below">
          {!state ? (
            <Loading height={100} />
          ) : (
            <div className="left">
              <div>
                <div>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="hrt" />
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
            {!isHomePage && typeof state?.index === 'number' ? (
              <button type="button" onClick={like} title="Like" aria-label="Like">
                <FontAwesomeIcon icon={state?.favorite ? solidHeart : regHeart} />
              </button>
            ) : null}
          </div>
        </div>
        {!isHomePage && typeof state?.index === 'number' ? (
          <div className="last">
            <button type="button" onClick={like} title="Like" aria-label="Like">
              <FontAwesomeIcon icon={state?.favorite ? solidHeart : regHeart} />
            </button>
          </div>
        ) : null}
      </div>
    </Header.Style>
  );
};

Header.Style = styled.section`
  ${styles}
`;

export default Header;

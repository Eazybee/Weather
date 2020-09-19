import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { ThemeType } from '<hooks>/useTheme';
import Degree from '<components>/ui/Degree';
import SunnyDay from '<assests>/images/sunny.jpg';
import WinterDay from '<assests>/images/winter.jpg';
import CloudyDay from '<assests>/images/cloudy.jpg';
import RainyDay from '<assests>/images/rainy.jpg';
import LazyLoader from '<components>/ui/LazyLoad';
import Loading from '<components>/ui/LoadingSpinner';
import { HeaderContext } from '<contexts>/Header';
import { HeadCity } from '<helpers>/typings';

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
                <img src={state.current.weather_icons[0].toString()} alt=" " />
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
  p,
  p > span,
  h1 {
    color: white;
    text-shadow: 1px 2px 2px black;
    font-weight: bold;
  }
  & > div {
    width: 100vw;
    height: 50vh;

    &.bg {
      position: absolute;
      z-index: -1;
    }

    &.content {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
    }
  }
  div.bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }

  div.content {
    & > div {
      width: 50%;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
    }

    & > div.left {
      padding-left: 10%;
      align-items: flex-start;

      > div {
        display: flex;
        flex-flow: column;
        width: fit-content;
      }

      > div > div {
        display: flex;

        svg {
          margin-right: 0.8rem;
          font-size: 1.4rem;
          position: relative;
          top: 0.35rem;

          path {
            fill: #59576d;
          }
        }
      }

      div.deg {
        display: flex;
        flex-flow: column;
        align-items: center;

        img {
          margin: 1rem 0;
          border-radius: 50%;
          height: 4rem;
          width: 4rem;
        }
      }

      .location {
        .city {
          font-size: 2rem;
        }
        .country {
          font-size: 0.8rem;
          font-weight: normal;
        }
      }
    }

    & > div.right {
      display: flex;
      justify-content: flex-end;
      flex-flow: row;
      padding-right: 10%;

      h1 {
        font-family: cursive;
        font-size: 6rem;
      }
    }
  }

  @media screen and (max-width: 650px) {
    & > div {
      &.content {
        & > div.left {
          padding-left: 5%;
        }
        & > div.right {
          padding-right: 5%;

          h1 {
            font-size: 3rem;
          }
        }
      }
    }
  }
  @media screen and (max-width: 420px) {
    & > div {
      &.content {
        display: flex;
        flex-flow: column-reverse;
        justify-content: space-between;
        & > div {
          width: 100%;
        }

        & > div.left {
          padding-left: 0;
          align-items: center;
        }
        & > div.right {
          padding-right: 0;
          justify-content: center;
        }
      }
    }
  }
`;

type Prop = {
  theme: ThemeType;
};
export default Header;

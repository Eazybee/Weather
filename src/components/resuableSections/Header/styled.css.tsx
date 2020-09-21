import { css } from 'styled-components';

const styles = css`
  p,
  p > span,
  h1 {
    color: white;
    text-shadow: 1px 2px 2px black;
    font-weight: bold;
  }
  min-height: 250px;
    height: 50vh;
  & > div.nav {
    padding: 1rem 5rem;
    height: 3rem;
    a {
      height: 2rem;
      font-weight: bold;
      background: linear-gradient(to right,#00d2ff 0%,#3a7bd5 51%);
      color: white;
      transition: 0.5s linear;
      position: relative;
      padding: .4rem 1rem;
      border-radius: .4rem;
      opacity: 0.8;
      box-shadow: 1px 2px #00000047;

      &:hover, &:focus {
        opacity: 1;
        top: -1px;
        box-shadow: 2px 3px 9px #00000047;
      }

    }
  }
  & > div:not(.nav) {
    width: 100vw;
    height: 50vh;
    min-height: 250px;

    &.bg {
      position: absolute;
      z-index: -1;
    }

    &.content {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      height: calc(100% - 3rem);
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

  @media screen and (max-width: 1000px)   {
    & > div.nav {
      padding: 1rem;
    }
  }
  @media screen and (max-width: 650px) {
    & > div:not(.nav) {
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
    & > div:not(.nav) {
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

export default styles;

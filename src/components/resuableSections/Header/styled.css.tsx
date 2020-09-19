import { css } from 'styled-components';

const styles = css`
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

export default styles;

import { css } from 'styled-components';

const styles = css`
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

export default styles;

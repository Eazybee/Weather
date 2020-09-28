import { css } from 'styled-components';

const styles = css`
  padding: 0 5rem;

  div.search {
    width: 100%;
    padding: 2rem 1rem;
    transition: width 0.5s;
  }

  div.fle {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    padding: 1rem;
    align-items: flex-end;

    > div {
      margin: 1rem 0;
      display: flex;
      flex-flow: column;
      width: 100%;
      transition: width 0.5s;
    }
  }

  div.full.search,
  div.full.fle > div {
    width: 100%;
  }

  @media screen and (max-width: 1000px)   {
    padding: 0 1rem;
  }
`;

export default styles;

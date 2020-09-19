import { css } from 'styled-components';

const styles = css`
  display: flex;
  padding: 2rem;
  border: 0.1rem solid #cecece;
  border-radius: 1rem;
  overflow: scroll;

  @media screen and (max-width: 880px) {
    width: 100%;
    flex-flow: row nowrap;
    height: fit-content;
    position: static;
    margin: 0;

    > .cardBtn {
      margin: 0 0.5rem;
      width: 10rem;
    }
  }
`;

export default styles;

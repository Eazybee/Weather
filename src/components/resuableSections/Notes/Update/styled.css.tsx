import { css } from 'styled-components';

const styles = css`
  width: 100%;
  border-radius: 5px;
  flex-flow: column;
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  > *:not(:last-child) {
    margin-bottom: 1rem;
  }

  > button {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  textarea {
    width: 100%;
    resize: vertical;
    border: 1px solid #ced4da;
    min-height: 10rem;
    padding: 1rem;
  }

  & > div:last-child {
    display: flex;
    justify-content: center;
    margin-top: 1rem;

    button {
      padding: 0.8rem 1.5rem;
      border-radius: 5px;

      &.del {
        background: red;
        margin-left: 3rem;
      }
    }
  }
`;

export default styles;

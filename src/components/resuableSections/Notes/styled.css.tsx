import { css } from 'styled-components';

const styles = css`
  button {
    background: linear-gradient(to right, #00d2ff 0%, #3a7bd5 51%);
    color: white;
    font-weight: bold;
    transition: 0.5s linear;
    position: relative;
  }
  button:hover {
    opacity: 0.8;
    top: -1px;
  }

  h1 {
  }

  .container {
    min-width: 60%;
    display: flex;
    flex-flow: column;

    .main div.add {
      margin-bottom: 2rem;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      padding: 1rem;
      border-radius: 5px;

      form {
        display: flex;
        flex-flow: row;
        justify-content: space-between;

        align-items: center;
      }

      & textarea {
        width: 85%;
        margin-right: 1rem;
        resize: vertical;
        border: 1px solid #ced4da;
        min-height: 5rem;
        padding: 1rem;
      }
      & button {
        padding: 0.5rem 1rem;
        max-height: 2rem;
        border-radius: 5px;
      }
    }

    .main > .notes {
      display: flex;
      flex-flow: column;
      padding: 1rem;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      border-radius: 5px;
    }

    .notes div {
      display: flex;
      flex-flow: row;
      align-items: center;
      padding: 1rem 0.5rem;
      width: 100%;
      border-radius: 5px;
      background: #f5f5f5;

      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }

      p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      button {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        background: red;
        color: white;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.7rem;
      }
    }
  }
`;

export default styles;

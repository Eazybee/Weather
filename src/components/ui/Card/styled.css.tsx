import { css } from 'styled-components';

export type StylesProps = {
  delay?: number;
};

const styles = css`
  opacity: 0;
  position: relative;
  background: transparent;
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 10rem;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0.02rem 0.05rem 0.3rem 0.1rem rgb(0 0 0 / 15%);
  border: 0.1rem solid #cecece;
  margin: 0.5rem;
  transition: 0.3s ease-in;

  &:hover,
  &:focus {
    transform: scale3d(1.1, 1.1, 1.1);
    box-shadow: 0.12rem 0.12rem 0.3rem 0.1rem rgb(0 0 0 / 15%);
  }

  animation: fadeInUp 1s ease-out forwards;
  animation-delay: ${({ delay }: StylesProps) => delay}s;

  > div {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    width: 100%;

    &:nth-child(2) {
      justify-content: center;
      margin: 1rem 0;
      img {
        width: 2.3rem;
        height: 2rem;
        border-radius: 0.4rem;
        margin-right: 0.5rem;
      }
    }
  }

  svg {
    font-size: 1.2rem;

    path {
      transition: 0.3s linear;
      fill: #9a8989;
    }
  }

  button {
    background: transparent;
    padding: 0.1rem;

    &:hover svg path,
    &:focus svg path &.like svg path,
    &.del svg path {
      fill: #fa0000;
    }
  }
`;

export default styles;

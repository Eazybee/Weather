import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regHeart, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import styled, { StyledComponent } from 'styled-components';
import Degree from '../Degree';

const Card: FC<Props> & {
  Styled: StyledComponent<'button', any, { delay?: number }, never>;
} = (props: Props) => {
  const handleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    props.handleLike();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    props.handleDelete();
  };

  const {
    name, temperature, favorite, imgScr, onClick, delay,
  } = props;
  return (
    <Card.Styled onClick={onClick} delay={delay}>
      <div>
        <button type="button" onClick={handleLike} className={`${favorite ? 'del' : ''}`}>
          <FontAwesomeIcon icon={favorite ? solidHeart : regHeart} />
        </button>
        <button type="button" className="del" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
      <div>
        <img src={imgScr} alt="" />
        <Degree size="2rem" cSize="0.9rem" bottom="0.9rem">
          {temperature}
        </Degree>
      </div>
      <p>{name}</p>
    </Card.Styled>
  );
};

Card.Styled = styled.button`
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
  animation-delay: ${({ delay }: Props) => delay}s;

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

Card.defaultProps = {
  delay: 0.5,
};

export type Props = {
  favorite: boolean;
  name: string;
  temperature: string | number;
  imgScr: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleLike: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleDelete: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  delay?: number;
};

export default Card;

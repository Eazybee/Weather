import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regHeart, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import styled, { StyledComponent } from 'styled-components';
import Degree from '../Degree';
import styles, { StylesProps } from './styled.css';

const Card: FC<Props> & {
  Styled: StyledComponent<'div', any, {
    delay?: number, ref?: React.MutableRefObject<HTMLDivElement| null>
    onClick?: any,
  }, never>;
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
    name, temperature, favorite, imgScr, onClick, delay, imgAlt,
  } = props;
  return (
    <Card.Styled delay={delay} onClick={onClick} className="cardBtn">
      <div>
        <button title="Like" type="button" onClick={handleLike} className={`${favorite ? 'del' : ''}`}>
          <FontAwesomeIcon icon={favorite ? solidHeart : regHeart} />
        </button>
        <button title="Delete" type="button" className="del" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
      <div>
        <img src={imgScr} alt={imgAlt} />
        <Degree size="2rem" cSize="0.9rem" bottom="0.9rem">
          {temperature}
        </Degree>
      </div>
      <p>{name}</p>
    </Card.Styled>
  );
};

Card.Styled = styled.div`
  ${styles}
`;

Card.defaultProps = {
  delay: 0.5,
};

export type Props = {
  favorite: boolean;
  name: string;
  temperature: string | number;
  imgScr: string;
  imgAlt: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleLike: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleDelete: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & StylesProps;

export default Card;

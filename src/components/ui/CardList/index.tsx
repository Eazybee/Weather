import React, { FC } from 'react';
import styled, { StyledComponent } from 'styled-components';
import Card, { Props as CardProps } from '<components>/ui/Card';
import styles from './styled.css';

const CardList: FC<Props> & {
  Styled: StyledComponent<'div', any, Props, never>;
} = (props: Props) => {
  const { cards } = props;

  return (
    <CardList.Styled {...props}>
      {cards.map((card, ind) => (
        <Card key={card.name} {...card} delay={(ind + 1) * 0.5} />
      ))}
    </CardList.Styled>
  );
};

CardList.Styled = styled.div`
  flex-flow: ${({ direction }: Props) => direction} nowrap;

  ${({ direction }: Props) => `
      ${
  direction === 'row'
    ? `
        width: 100%;
        height: fit-content;

        > .cardBtn {
          margin-top: 0;
          margin-bottom: 0;
          min-width: 10rem;
        }
      `
    : `
        width: 100%;
        height: 100%;
        background: white;
        margin-left: 1rem;

        > .cardBtn {
          width: 100%;
          margin-left: 0;
          margin-right: 0;
        }
      `
}
  `}
  ${styles}
`;

CardList.defaultProps = {
  direction: 'column',
  width: 'full',
};

export type Props = {
  cards: CardProps[];
  direction?: 'row' | 'column';
  width?: 'full' | 'fraction';
};

export default CardList;

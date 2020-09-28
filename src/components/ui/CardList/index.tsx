import React, { FC } from 'react';
import styled, { StyledComponent } from 'styled-components';
import Card, { Props as CardProps } from '<components>/ui/Card';
import styles from './styled.css';

const CardList: FC<Props> & {
  Styled: StyledComponent<'div', any, {}, never>;
} = (props: Props) => {
  const { cards } = props;

  return (
    <CardList.Styled>
      {cards.map((card, ind) => (
        <Card key={card.name} {...card} delay={(ind + 1) * 0.5} />
      ))}
    </CardList.Styled>
  );
};

CardList.Styled = styled.div`
  flex-flow: row nowrap;
  width: 100%;
  height: fit-content;

  > .cardBtn {
    margin-top: 0;
    margin-bottom: 0;
    min-width: 10rem;
  }


  ${styles}
`;

export type Props = {
  cards: CardProps[];
};

export default CardList;

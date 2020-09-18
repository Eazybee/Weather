import React, { FC } from 'react';
import styled, { StyledComponent } from 'styled-components';
import Card, { Props as CardProps } from '<components>/ui/Card';

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
  display: flex;
  flex-flow: ${({ direction }: Props) => direction} nowrap;
  padding: 2rem;
  border: 0.1rem solid #cecece;
  border-radius: 1rem;
  overflow: scroll;
  ${({ direction }: Props) => `
      ${
  direction === 'row'
    ? `
        width: 100%;
        height: fit-content;

        > button {
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

        > button {
          width: 100%;
          margin-left: 0;
          margin-right: 0;
        }
      `
}
  `}

  @media screen  and (max-width:880px) {
    width: 100%;
    flex-flow: row nowrap;
    height: fit-content;
    position: static;
    margin: 0;

    > button {
      margin: 0 0.5rem;
      width: 10rem;
    }
  }
`;

CardList.defaultProps = {
  direction: 'column',
  width: 'full',
};

type Props = {
  cards: CardProps[];
  direction?: 'row' | 'column';
  width?: 'full' | 'fraction';
};

export default CardList;

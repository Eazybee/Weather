import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '<helpers>/testUtils/testUtils';
import CardList, { Props } from '.';
import { mocks } from '<mocks>/index';


let props: Props;
const [mockCity] = mocks;

describe('CardList', () => {
  beforeEach(() => {
    props = {
      cards: [{
        favorite: mockCity.favorite,
        name: mockCity.location.name,
        temperature: mockCity.current.temperature,
        imgScr: mockCity.current.weather_icons[0],
        imgAlt: mockCity.current.weather_descriptions[0],
        onClick: () => {},
        handleLike: () => {},
        handleDelete: () => {},
        delay: 0,
      }],
      direction: 'row',
      width: 'full',
    };
  });

  it('should render with row styles', () => {
    const { getByText, container } = render(<CardList {...props} />);

    expect(getByText(props.cards[0].name)).toBeTruthy();
    expect(container.firstChild).toHaveStyle(`
      height: fit-content;
    `);
  });

  it('should render with columns styles', () => {
    props.direction = 'column';
    const { getByText, container } = render(<CardList {...props} />);

    expect(getByText(props.cards[0].name)).toBeTruthy();
    expect(container.firstChild).toHaveStyle(`
        height: 100%;
        background: white;
        margin-left: 1rem;
    `);
  });
});

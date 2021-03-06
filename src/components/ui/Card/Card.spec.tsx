import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '<mocks>/testUtils';
import Card, { Props } from '.';
import { cities } from '<mocks>/index';


const [mockCity] = cities;
let props: Props;

describe('Card', () => {
  beforeEach(() => {
    props = {
      favorite: mockCity.favorite,
      name: mockCity.location.name,
      temperature: mockCity.current.temperature,
      imgScr: mockCity.current.weather_icon,
      imgAlt: mockCity.current.weather_description,
      onClick: () => {},
      handleLike: () => {},
      handleDelete: () => {},
      delay: 0,
    };
  });

  it('should render', () => {
    const { getByText, getByAltText } = render(<Card {...props} />);

    expect(getByText(props.name)).toBeTruthy();
    expect(getByText(props.temperature.toString())).toBeTruthy();
    expect(getByAltText(props.imgAlt)).toBeTruthy();
  });

  it('should trigger button handlers', () => {
    const handleLike = jest.fn();
    const handleDelete = jest.fn();

    props.handleLike = handleLike;
    props.handleDelete = handleDelete;
    props.favorite = true;
    const { getByTitle } = render(<Card {...props} />);

    const likeBtn = getByTitle('Like');
    const delBtn = getByTitle('Delete');

    fireEvent.click(likeBtn);
    fireEvent.click(delBtn);
    if (delBtn.parentElement?.parentElement) {
      fireEvent.click(delBtn.parentElement?.parentElement);
    }

    expect(handleLike).toHaveBeenCalledWith();
    expect(handleDelete).toHaveBeenCalledWith();
    expect(handleDelete).toHaveBeenCalledWith();
  });
});

import React, { useContext } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import CitiesProvider, { CitiesContext, ActionType } from '../Cities';
import { mocks } from '<mocks>/index';


describe('Cities Provider', () => {
  it('', () => {
    const Div = () => {
      const { dispatch } = useContext(CitiesContext);
      const handleClick = () => {
        dispatch({ type: ActionType.ADD, payload: mocks[0] });
      };

      return (
        <div>
          <button type="button" onClick={handleClick}>Click me</button>
        </div>
      );
    };

    const { getByText } = render(
      <CitiesProvider>
        <Div />
      </CitiesProvider>,
    );

    expect(getByText('Click me')).toBeTruthy();
  });
});

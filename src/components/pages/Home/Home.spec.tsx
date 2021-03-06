import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '<mocks>/testUtils';
import HomePage from '.';

describe('HomePage', () => {
  it('should render', async () => {
    jest.useFakeTimers();
    const { container } = render(<HomePage />, {});

    expect(container).toBeTruthy();
  });
});

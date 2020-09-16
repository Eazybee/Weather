import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '<helpers>/tests/testUtils';
import HomePage from '.';


describe('HomePage', () => {
  it('should render', async () => {
    const { container } = render(<HomePage />, {});

    expect(container.firstChild?.nodeName).toEqual('SECTION');
    expect(container.firstChild?.firstChild).toContainHTML('<h1>HomePage</h1>');
  });
});

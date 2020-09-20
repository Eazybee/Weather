import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '<mocks>/testUtils';
import Degree from '.';

describe('Degree', () => {
  it('should render  with default props and styles', async () => {
    const { container } = render(<Degree>30</Degree>, {});

    expect(container.firstChild?.nodeName).toEqual('P');
    expect(container.firstChild?.textContent).toEqual('30°c');
    expect(container.firstChild).toHaveStyle(`
      font-size: 1rem;
    `);
    expect(container.firstChild?.childNodes[1]).toHaveStyle(`
      font-weight: normal;
    `);
    expect(container.firstChild?.childNodes[2]).toHaveStyle(`
      font-weight: normal;
      position: relative;
      bottom: 0.29rem;
      font-size: 0.8rem;
    `);
  });

  it('should render  with custom styles', async () => {
    const { container } = render(
      <Degree size="3rem" cSize="1.3rem" bottom="1.4rem">
        20
      </Degree>,
      {},
    );

    expect(container.firstChild?.nodeName).toEqual('P');
    expect(container.firstChild?.textContent).toEqual('20°c');
    expect(container.firstChild).toHaveStyle(`
      font-size: 3rem;
    `);
    expect(container.firstChild?.childNodes[2]).toHaveStyle(`
      bottom: 1.4rem;
      font-size: 1.3rem;
    `);
  });
});

/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


const customRender = (
  ui: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string>)>,
  options = {},
) => render(ui, { ...options });

export * from '@testing-library/react';

export { customRender as render };

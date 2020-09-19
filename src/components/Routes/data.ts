import HomePage from '<components>/pages/Home';
import InfoPage from '<components>/pages/Info';

type RouteData = {
  default: {
    exact: boolean;
    path: string;
    protected?: boolean;
    Component: (prop?: any) => JSX.Element;
  }[];
};

const Routes: RouteData = {
  default: [
    {
      exact: true,
      path: '/',
      Component: HomePage,
    },
    {
      exact: true,
      path: '/info',
      Component: InfoPage,
    },
  ],
};

export default Routes;

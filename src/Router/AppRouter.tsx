import { createBrowserRouter } from 'react-router-dom';
import * as Pages from '../Pages';
import * as ROUTES from './routes';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Pages.HomePage />,
    errorElement: <Pages.ErrorPage />,
  },
  {
    path: ROUTES.SEARCH_ROUTE(':entity', ':query'),
    element: <Pages.SearchPage />,
    errorElement: <Pages.ErrorPage />,
  },
]);

export default AppRouter;

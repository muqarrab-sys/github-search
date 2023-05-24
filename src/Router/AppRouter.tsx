import { createBrowserRouter } from 'react-router-dom';
import * as Pages from '~/Pages';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Pages.SearchPage />,
    errorElement: <Pages.ErrorPage />,
  },
]);

export default AppRouter;

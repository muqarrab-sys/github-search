import { Fragment } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRouter from './Router/AppRouter';
import { useTheme } from './Theme';
import toastConfigs from './Theme/Configs/ToasterConfigs';

function AppRoot() {
  const { theme } = useTheme();

  return (
    <Fragment>
      <RouterProvider router={AppRouter} />
      <ToastContainer {...toastConfigs} theme={theme.type} />
    </Fragment>
  );
}

export default AppRoot;

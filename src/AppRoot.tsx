import { Fragment } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRouter from './Router/AppRouter';
import { useTheme } from './Theme';
import toastConfigs from './Theme/Configs/ToasterConfigs';

function AppRoot() {
  const { mode } = useTheme();

  return (
    <Fragment>
      <RouterProvider router={AppRouter} />
      <ToastContainer {...toastConfigs} theme={mode} />
    </Fragment>
  );
}

export default AppRoot;

import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoot from './AppRoot';
import Store, { persistor } from './Store/Store';
import { ThemeProvider } from './Theme';

function App() {
  return (
    <ThemeProvider>
      <StoreProvider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoot />
        </PersistGate>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;

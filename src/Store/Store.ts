import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import RootReducer from './RootReducer';
import { GithubSearchApi } from './Queries/GithubSearchApi';

const persistConfig = {
  key: 'root',
  storage,
};

const Store = configureStore({
  reducer: persistReducer(persistConfig, RootReducer),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(GithubSearchApi.middleware),
});

export const persistor = persistStore(Store);

export default Store;

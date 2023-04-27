import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import RootReducer from './RootReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const Store = configureStore({
  reducer: persistReducer(persistConfig, RootReducer),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export const persistor = persistStore(Store);

export default Store;

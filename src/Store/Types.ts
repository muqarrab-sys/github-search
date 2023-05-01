import RootReducer from './RootReducer';
import Store from './Store';

export type RootState = ReturnType<typeof RootReducer>;
export type AppDispatch = typeof Store.dispatch;

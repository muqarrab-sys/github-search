import { combineReducers } from '@reduxjs/toolkit';
import { GithubSearchApi } from './Queries/GithubSearchApi';

const RootReducer = combineReducers({
  [GithubSearchApi.reducerPath]: GithubSearchApi.reducer,
});

export default RootReducer;

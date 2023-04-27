import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {}

const initialState = {} as InitialState;

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction) {},
  },
});

export const {} = slice.actions;

export default slice.reducer;

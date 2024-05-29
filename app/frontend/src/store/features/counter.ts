import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { AppState } from '../store';

export interface ICounterSlice {
  value: number;
}

const initialState: ICounterSlice = {
  value: 0,
};

const name = 'counter';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
  }
});

export const counter = {
  actions: slice.actions,
  select: (state: AppState) => state.counter,
};

export default slice;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { AppState } from '../store';

export interface IOllamaSlice {
  isOnSystem: boolean;
  isServerRunning: boolean;
  isInitialized: boolean;
  serverUrl: string;
}

const initialState: IOllamaSlice = {
  isOnSystem: false,
  isServerRunning: false,
  isInitialized: false,
  serverUrl: ''
};

const name = 'ollama';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    init(state, action: PayloadAction<{ isRunning: boolean; isOnSystem: boolean, serverUrl: string }>) {
      state.isInitialized = true
      state.isOnSystem = action.payload.isOnSystem
      state.isServerRunning = action.payload.isRunning
      state.serverUrl = action.payload.serverUrl
    },
  }
});

export const ollama = {
  actions: slice.actions,
  select: (state: AppState) => state.ollama,
};

export default slice;

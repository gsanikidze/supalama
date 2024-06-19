import { configureStore } from '@reduxjs/toolkit';
import ollamaSlice from './features/ollama';
import appConfig from './features/app-config';
import api from './api';

export const makeStore = () => configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [ollamaSlice.name]: ollamaSlice.reducer,
    [appConfig.name]: appConfig.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

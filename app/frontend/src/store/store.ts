import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './features/counter';
import api from './api';

export const makeStore = () => configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [counterSlice.name]: counterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

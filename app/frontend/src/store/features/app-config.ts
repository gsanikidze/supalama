import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { AppState } from '../store';

type IUITheme = "dark" | "light"

export interface IAppConfigSlice {
  theme: IUITheme;
}

const SAVED_THEME_KEY = "APP_THEME"

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(SAVED_THEME_KEY) as IUITheme | null

  if (savedTheme) {
    return savedTheme
  }

  const systemTheme: IUITheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  return systemTheme
}

const saveTheme = (t: IUITheme) => {
  localStorage.setItem(SAVED_THEME_KEY, t)
}

const initialState: IAppConfigSlice = {
  theme: getInitialTheme(),
};

const name = 'appConfig';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<IUITheme>) {
      state.theme = action.payload;

      saveTheme(state.theme)
    },
    toggleTheme(state) {
      if (state.theme === "dark") {
        state.theme = "light";
      } else {
        state.theme = "dark";
      }

      saveTheme(state.theme)
    },
  }
});

export const appConfig = {
  actions: slice.actions,
  select: (state: AppState) => state.appConfig,
};

export default slice;

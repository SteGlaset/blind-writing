import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ILocaleState {
  lang: string;
}

const initialState: ILocaleState = {
  lang: navigator.languages[1] || 'en',
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    changeLocale: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
});

export const { changeLocale } = localeSlice.actions;

export default localeSlice.reducer;

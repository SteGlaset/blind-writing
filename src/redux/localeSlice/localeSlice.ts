import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { languagesList } from '~/i18n/translations';

interface ILocaleState {
  lang: string;
}

const initialState: ILocaleState = {
  lang: languagesList[navigator.languages[0].slice(0, 2)] || 'en',
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    changeLocale: (state, action: PayloadAction<string>) => {
      state.lang ||= languagesList[action.payload];
    },
  },
});

export const { changeLocale } = localeSlice.actions;

export default localeSlice.reducer;

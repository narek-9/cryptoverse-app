import { RootState } from "..";

export const getCurrentTheme = (state: RootState) => state.theme.theme;
export const getCryptosData = (state: RootState) => state.cryptos;
export const getSearchCryptosData = (state: RootState) => state.searchCryptos;

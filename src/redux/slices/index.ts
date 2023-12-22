import { combineReducers } from "redux";

import cryptosReducer from "./cryptosSlice";
import searchCryptosReducer from "./searchCryptosSlice";
import themeReducer from "./themeSlice";

export const rootReducer = combineReducers({
  cryptos: cryptosReducer,
  searchCryptos: searchCryptosReducer,
  theme: themeReducer,
});

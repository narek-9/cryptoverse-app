import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { getSearchCryptosData } from "../../api";
import { searchCoin } from "../../types";

interface IinitialState {
  data: {
    searchValue: string;
    searchCryptos: searchCoin[];
  };
  loading: boolean;
  error: AxiosError | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: IinitialState = {
  data: {
    searchValue: "",
    searchCryptos: [],
  },
  loading: false,
  error: null,
  status: "idle",
};

export const fetchSearchCryptosData = createAsyncThunk(
  "searchCryptos/fetchSearchCryptosData",
  async (searchValue: string, { rejectWithValue }) => {
    try {
      const data = await getSearchCryptosData(searchValue);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchCryptosSlice = createSlice({
  name: "searchCryptos",
  initialState,
  reducers: {
    updateSearchValue: (state, action: PayloadAction<string>) => {
      state.data.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchCryptosData.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchSearchCryptosData.fulfilled, (state, action) => {
        state.data.searchCryptos = action.payload;
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(fetchSearchCryptosData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AxiosError;
        state.status = "failed";
      });
  },
});

export const { updateSearchValue } = searchCryptosSlice.actions;
export default searchCryptosSlice.reducer;

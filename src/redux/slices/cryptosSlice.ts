import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { coinsItem } from "../../types";
import { getCryptosData } from "../../api";

interface IinitialState {
  data: coinsItem[];
  loading: boolean;
  error: AxiosError | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: IinitialState = {
  data: [],
  loading: false,
  error: null,
  status: "idle",
};
 
export const fetchCryptosData = createAsyncThunk(
  "cryptos/fetchCrytposData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCryptosData();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const cryptosSlice = createSlice({
  name: "cryptos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptosData.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchCryptosData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(fetchCryptosData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AxiosError;
        state.status = "failed";
      });
  },
});

export default cryptosSlice.reducer;

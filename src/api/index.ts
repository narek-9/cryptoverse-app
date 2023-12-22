import axios from "axios";

import { coin, coinsItem, cryptoChartData, searchCoin } from "../types";

const baseURL = "https://api.coingecko.com/api/v3";

export const getCryptosData = async (): Promise<coinsItem[]> => {
  const response = await axios.get(
    `${baseURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false&locale=en`
  );
  return response.data;
};

export const getSearchCryptosData = async (
  searchValue: string
): Promise<searchCoin[]> => {
  const response = await axios.get(`${baseURL}/search?query=${searchValue}`);
  return response.data.coins;
};

export const getCryptoData = async (id: string): Promise<coin> => {
  const response = await axios.get(
    `${baseURL}/coins/${id}?tickers=false&community_data=false&developer_data=false`
  );
  return response.data;
};

export const getCryptoChartData = async (
  id: string,
  days: number = 465
): Promise<cryptoChartData> => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  );
  return response.data;
};

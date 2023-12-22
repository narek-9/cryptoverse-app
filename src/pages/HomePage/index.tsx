import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

import { useTimeCache } from "hooks/useTimeCache";
import { fetchCryptosData } from "store/slices/cryptosSlice";
import { getCryptosData, getCurrentTheme } from "store/selectors";
import { RootState } from "store";

import { Search } from "components/Search";
import { PaginatedCryptosTable } from "components/PaginatedCryptosTable";
import { Calculator } from "components/Calculator";
import { Carousel } from "components/Carousel";
import { ErrorBoundary } from "components/ErrorBoundary";
import { Loading } from "components/Loading";

import styles from "./HomePage.module.scss";

export const HomePage = () => {
  const cryptosData = useSelector(getCryptosData);
  const currentTheme = useSelector(getCurrentTheme);

  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  const { lastFetchTime, updateLastFetchTime } = useTimeCache();

  useEffect(() => {
    if (
      !cryptosData.data.length ||
      lastFetchTime - new Date().getTime() > 3600000
    ) {
      dispatch(fetchCryptosData()).then(updateLastFetchTime);
    }
  }, []);

  if (cryptosData.error) {
    return <ErrorBoundary error={cryptosData.error} pageType="home" />;
  }

  return (
    <div className={styles.mainPage}>
      <Calculator cryptos={cryptosData.data} />

      <div className={styles.mainPage__topCryptos}>
        <div
          className={`${styles.mainPage__topCryptos__content}  ${
            currentTheme === "dark"
              ? styles.lightThemeColors
              : styles.darkThemeColors
          }`}
        >
          <h1 className={styles.mainPage__topCryptos__content__title}>
            Top Cryptos
          </h1>
          <p className={styles.mainPage__topCryptos__content__text}>
            The most famous cryptocurrencies in the world
          </p>
          <div>
            <ul>{cryptosData.loading ? <Loading /> : <Carousel />}</ul>
          </div>
        </div>
      </div>
      <div className={styles.mainPage__content}>
        {cryptosData.loading ? (
          <Loading />
        ) : (
          <>
            <h2
              className={
                currentTheme === "dark"
                  ? styles.mainPage__content__title__lightThemeColors
                  : styles.mainPage__content__title__darkThemeColors
              }
            >
              Cryptocurrency Prices by Market Cap
            </h2>
            <Search />
            <PaginatedCryptosTable />
          </>
        )}
      </div>
    </div>
  );
};

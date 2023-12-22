import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AxiosError } from "axios";
import ReactHtmlParser from "react-html-parser";

import { getCurrentTheme } from "../../redux/selectors";
import { getCryptoData } from "../../api";
import { coin } from "../../types";

import { ErrorBoundary } from "../../components/ErrorBoundary";
import { Loading } from "../../components/Loading";

import styles from "./CoinInfo.module.scss";

interface CoinInfoProps {
  id: string;
  setError: React.Dispatch<React.SetStateAction<AxiosError | null>>;
}

export const CoinInfo: FC<CoinInfoProps> = ({ id, setError }) => {
  const [coinApiState, setCoinApiState] = useState<{
    data: coin | null;
    loading: boolean;
    error: AxiosError<coin> | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });
  const [isDescriptionHidden, setIsDescriptionHidden] = useState<boolean>(true);

  const currentTheme = useSelector(getCurrentTheme);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCoinApiState((prev) => ({ ...prev, loading: true }));
        const data = await getCryptoData(id);
        setCoinApiState((prev) => ({ ...prev, data, loading: false }));
      } catch (error) {
        setError(error as AxiosError<coin>);
      }
    };

    fetchData();
  }, [id]);

  if (coinApiState.error) {
    return <ErrorBoundary error={coinApiState.error} pageType="coin" />;
  }

  return (
    <>
      <div
        className={`${styles.Info} ${
          currentTheme === "dark"
            ? styles.lightThemeColors
            : styles.darkThemeColors
        }`}
      >
        {coinApiState.loading ? (
          <Loading />
        ) : (
          coinApiState.data && (
            <>
              <div className={styles.Info__img}>
                <img src={coinApiState.data.image.large} alt="" />
              </div>
              <h2 className={styles.Info__name}>
                {coinApiState.data.name || "Unknown"}
              </h2>
              {coinApiState.data.description && (
                <p className={styles.Info__description}>
                  {ReactHtmlParser(
                    isDescriptionHidden
                      ? coinApiState.data.description.en.slice(0, 200)
                      : coinApiState.data.description.en
                  )}
                  {coinApiState.data.description.en.length > 200 && (
                    <small
                      onClick={() => setIsDescriptionHidden((prev) => !prev)}
                    >
                      {isDescriptionHidden ? "...See all" : "Hide"}
                    </small>
                  )}
                </p>
              )}
              {coinApiState.data.market_cap_rank && (
                <p className={styles.Info__rank}>
                  Rank։ {coinApiState.data.market_cap_rank}
                </p>
              )}
              {coinApiState.data.genesis_date && (
                <p className={styles.Info__date}>
                  Genesis Date: {coinApiState.data.genesis_date}
                </p>
              )}
              {coinApiState.data.market_data.circulating_supply !== null &&
                coinApiState.data.market_data.max_supply && (
                  <p className={styles.Info__count}>
                    Mined:{" "}
                    {coinApiState.data.market_data.circulating_supply.toFixed(
                      0
                    )}{" "}
                    / {coinApiState.data.market_data.max_supply.toFixed(0)}
                  </p>
                )}
              {coinApiState.data.market_data.current_price.usd && (
                <p className={styles.Info__price}>
                  Price: $ {coinApiState.data.market_data.current_price.usd}
                </p>
              )}
            </>
          )
        )}
      </div>
    </>
  );
};

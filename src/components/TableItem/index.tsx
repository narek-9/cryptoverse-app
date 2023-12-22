import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getCurrentTheme } from "../../redux/selectors";
import { formatMarketCap } from "../../utils/formatMarketCap";
import { coinsItem, searchCoin } from "../../types";

import styles from "./TableItem.module.scss";

interface TableItemProps<T> {
  crypto: T;
  isSmallDevice: boolean;
}

export const TableItem: FC<TableItemProps<coinsItem | searchCoin>> = ({
  crypto,
  isSmallDevice,
}) => {
  const currentTheme = useSelector(getCurrentTheme);

  const navigate = useNavigate();

  const isTypeOfCoinsItem = "price_change_24h" in crypto;

  const getValidMarketCap = (marketCap: number) => {
    const stringedMarketCap = String(marketCap);
    if (!marketCap || stringedMarketCap.length < 4) {
      return "Unknown";
    }

    const numberOfDigits = !(stringedMarketCap.length % 3)
      ? 2
      : (stringedMarketCap.length % 3) - 1;

    const moneyAmount =
      stringedMarketCap.length > 3 && stringedMarketCap.length < 7
        ? "K"
        : stringedMarketCap.length > 6 && stringedMarketCap.length < 10
        ? "M"
        : stringedMarketCap.length > 9 && stringedMarketCap.length < 13
        ? "B"
        : "T";

    return formatMarketCap(marketCap, numberOfDigits, moneyAmount);
  };

  return (
    <tr
      className={`${styles.tableItem} ${
        currentTheme === "dark"
          ? styles.lightThemeColors
          : styles.darkThemeColors
      }`}
      onClick={() => navigate(`/cryptos/:${crypto.id}`)}
    >
      <td>
        <div>
          <img
            className={styles.tableItem__img}
            src={isTypeOfCoinsItem ? crypto.image : crypto.large}
            alt={crypto.symbol.toUpperCase()}
          />
        </div>
        <div className={styles.tableItem__text}>
          <p
            className={`${styles.tableItem__text__symbol} ${
              currentTheme === "dark"
                ? styles.tableItem__text__symbol__lightThemeColors
                : styles.tableItem__text__symbol__darkThemeColors
            }`}
          >
            {crypto.symbol.toUpperCase()}
          </p>
          <span
            className={`${styles.tableItem__text__name} ${
              currentTheme === "dark"
                ? styles.tableItem__text__name__lightThemeColors
                : styles.tableItem__text__name__darkThemeColors
            }`}
          >
            {crypto.name[0].toUpperCase() + crypto.name.slice(1)}
          </span>
        </div>
      </td>

      {isSmallDevice &&
        (isTypeOfCoinsItem ? (
          <td
            className={`${styles.tableItem__price} ${
              currentTheme === "dark"
                ? styles.tableItem__price__lightThemeColors
                : styles.tableItem__price__darkThemeColors
            }`}
          >
            $ {crypto.current_price.toFixed(2)}
          </td>
        ) : (
          <td
            className={`${styles.tableItem__marketCap} ${
              currentTheme === "dark"
                ? styles.tableItem__marketCap__lightThemeColors
                : styles.tableItem__marketCap__darkThemeColors
            }`}
          >
            {crypto.market_cap_rank || "Unknown"}
          </td>
        ))}

      {!isSmallDevice &&
        (isTypeOfCoinsItem ? (
          <>
            <td
              className={`${styles.tableItem__price} ${
                currentTheme === "dark"
                  ? styles.tableItem__price__lightThemeColors
                  : styles.tableItem__price__darkThemeColors
              }`}
            >
              $ {crypto.current_price.toFixed(2)}
            </td>
            <td
              className={
                crypto.price_change_24h > 0 ? styles.green : styles.red
              }
            >
              {`${
                crypto.price_change_24h > 0 ? "$ +" : "$ "
              }${crypto.price_change_24h.toFixed(2)}`}
            </td>
            <td
              className={`${styles.tableItem__marketCap} ${
                currentTheme === "dark"
                  ? styles.tableItem__marketCap__lightThemeColors
                  : styles.tableItem__marketCap__darkThemeColors
              }`}
            >
              $ {getValidMarketCap(crypto.market_cap)}
            </td>
          </>
        ) : (
          <td
            className={`${styles.tableItem__marketCap} ${
              currentTheme === "dark"
                ? styles.tableItem__marketCap__lightThemeColors
                : styles.tableItem__marketCap__darkThemeColors
            }`}
          >
            {crypto.market_cap_rank || "Unknown"}
          </td>
        ))}
    </tr>
  );
};

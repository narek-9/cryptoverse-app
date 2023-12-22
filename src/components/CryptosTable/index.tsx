import { FC } from "react";

import { coinsItem, searchCoin } from "types";

import { TableItem } from "components/TableItem";

import styles from "./CryptosTable.module.scss";

interface CryptosTableProps<T> {
  cryptos: T[];
  leftLimit: number;
  animationData: {
    isAnimateTbody: boolean;
    animationSide: "left" | "right" | "none";
  };
  isSmallDevice: boolean;
}

export const CryptosTable: FC<CryptosTableProps<coinsItem | searchCoin>> = ({
  cryptos,
  leftLimit,
  animationData,
  isSmallDevice,
}) => {
  let isTypeOfCoinsItem;

  if (cryptos[0]) {
    isTypeOfCoinsItem = "price_change_24h" in cryptos[0];
  }

  if (isSmallDevice) {
    return (
      <table className={styles.Table}>
        <colgroup>
          <col className={styles.Table__smallDeviceCol} />
          <col className={styles.Table__smallDeviceCol} />
        </colgroup>
        <thead>
          <tr>
            <th>Coin</th>
            {isTypeOfCoinsItem ? (
              <>
                <th>Price</th>
              </>
            ) : (
              <th>Market Cap Rank</th>
            )}
          </tr>
        </thead>
        <tbody
          className={`${styles.Table__default} ${
            animationData.isAnimateTbody ? styles.Table__opacity : ""
          }`}
        >
          {cryptos.slice(leftLimit * 10, leftLimit * 10 + 10).map((crypto) => (
            <TableItem crypto={crypto} isSmallDevice={true} key={crypto.id} />
          ))}
        </tbody>
      </table>
    );
  }

  return cryptos.length ? (
    <>
      <table className={styles.Table}>
        <colgroup>
          <col />
          <col />
          {isTypeOfCoinsItem && (
            <>
              <col />
              <col />
            </>
          )}
        </colgroup>
        <thead>
          <tr>
            <th>Coin</th>
            {isTypeOfCoinsItem ? (
              <>
                <th>Price</th>
                <th>24h change</th>
                <th>Market Cap</th>
              </>
            ) : (
              <th>Market Cap Rank</th>
            )}
          </tr>
        </thead>
        <tbody
          className={`${styles.Table__default} ${
            animationData.isAnimateTbody ? styles.Table__opacity : ""
          }`}
        >
          {cryptos.slice(leftLimit * 10, leftLimit * 10 + 10).map((crypto) => (
            <TableItem crypto={crypto} isSmallDevice={false} key={crypto.id} />
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <h1 className={styles.noCoinsText}>No Coins</h1>
  );
};

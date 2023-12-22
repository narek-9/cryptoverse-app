import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AxiosError } from "axios";

import { getCryptosData } from "store/selectors";

import { Chart as ChartItem } from "components/Chart";
import { CoinInfo } from "components/CoinInfo";
import { Calculator } from "components/Calculator";
import { ErrorBoundary } from "components/ErrorBoundary";

import prevPage from "assets/prevPage-arrow.png";
import styles from "./CoinPage.module.scss";

export const CoinPage = () => {
  const cryptosData = useSelector(getCryptosData);
  const [error, setError] = useState<AxiosError | null>(null);

  let { id } = useParams();
  id = id?.slice(1);

  const navigate = useNavigate();

  if (error) {
    return <ErrorBoundary error={error} pageType="coin" />;
  }

  return (
    <div className={styles.coinPage}>
      <button className={styles.backArrow} onClick={() => navigate("/")}>
        <img src={prevPage} alt="back" />
      </button>
      <Calculator cryptos={cryptosData.data} />
      <CoinInfo id={`${id}`} setError={setError} />
      <ChartItem setError={setError} />
    </div>
  );
};

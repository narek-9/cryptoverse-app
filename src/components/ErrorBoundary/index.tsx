import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import prevPage from "../../assets/prevPage-arrow.png";
import styles from "./ErrorBoundary.module.scss";

interface ErrorBoundaryProps {
  error: AxiosError;
  pageType: "home" | "coin";
}

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({ error, pageType }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.error}>
      <h1>
        Error
        {error.response?.status && <>:{error.response.status}</>}
      </h1>
      <h2>{error.message}</h2>
      <p>Please reload page!</p>
      {pageType === "coin" && (
        <button className={styles.backArrow} onClick={() => navigate("/")}>
          <img src={prevPage} alt="back" />
        </button>
      )}
    </div>
  );
};

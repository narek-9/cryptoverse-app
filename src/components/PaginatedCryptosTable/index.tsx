import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

import { fetchSearchCryptosData } from "../../redux/slices/searchCryptosSlice";
import { getCryptosData, getSearchCryptosData } from "../../redux/selectors";
import { RootState } from "../../redux";

import { CryptosTable } from "../../components/CryptosTable";
import { Pagination } from "../../components/Pagination";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { Loading } from "../../components/Loading";

export const PaginatedCryptosTable = () => {
  const [leftLimit, setLeftLimit] = useState<number>(
    Number(localStorage.getItem("leftLimit"))
  );
  const [animationData, setAnimationData] = useState<{
    isAnimateTbody: boolean;
    animationSide: "left" | "right" | "none";
  }>({
    isAnimateTbody: false,
    animationSide: "none",
  });
  const [isSmallDevice, setIsSmallDevice] = useState<boolean>(false);

  const cryptosData = useSelector(getCryptosData);
  const searchCryptosData = useSelector(getSearchCryptosData);

  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

  useEffect(() => {
    dispatch(fetchSearchCryptosData(searchCryptosData.data.searchValue));
  }, [searchCryptosData.data.searchValue]);

  useEffect(() => {
    setLeftLimit(0);
    localStorage.setItem("leftLimit", String(0));
  }, [searchCryptosData.data]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth <= 700) {
      setIsSmallDevice(true);
    } else if (window.innerHeight > 700) {
      setIsSmallDevice(false);
    }
  };

  const data = searchCryptosData.data.searchValue
    ? searchCryptosData.data.searchCryptos
    : cryptosData.data;

  let error;
  let isLoading;

  if (data === cryptosData.data && cryptosData.error) {
    error = cryptosData.error;
  } else if (
    data === searchCryptosData.data.searchCryptos &&
    searchCryptosData.error
  ) {
    error = searchCryptosData.error;
  }

  if (data === cryptosData.data && cryptosData.loading) {
    isLoading = cryptosData.loading;
  } else if (data === searchCryptosData.data.searchCryptos) {
    isLoading = searchCryptosData.loading;
  }

  if (error) {
    return <ErrorBoundary error={error} pageType="home" />;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <CryptosTable
          cryptos={data}
          leftLimit={leftLimit}
          animationData={animationData}
          isSmallDevice={isSmallDevice}
        />
      )}
      {data.length ? (
        isLoading ? (
          ""
        ) : (
          <Pagination
            cryptos={data}
            leftLimit={leftLimit}
            setLeftLimit={(newPage: number) => {
              setLeftLimit(newPage);
              localStorage.setItem("leftLimit", String(newPage));
            }}
            setAnimationData={setAnimationData}
          />
        )
      ) : (
        ""
      )}
    </>
  );
};

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

import { updateSearchValue } from "../../redux/slices/searchCryptosSlice";
import { getCurrentTheme, getSearchCryptosData } from "../../redux/selectors";
import { RootState } from "../../redux";

import styles from "./Search.module.scss";

export const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const currentTheme = useSelector(getCurrentTheme);
  const searchCryptosData = useSelector(getSearchCryptosData);

  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  const handleSearch = (searchValue: string) => {
    dispatch(updateSearchValue(searchValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    if (!e.target.value.trim()) {
      dispatch(updateSearchValue(e.target.value.trim()));
    }
  };

  useEffect(() => {
    setSearchValue(searchCryptosData.data.searchValue);
  }, []);

  return (
    <div className={styles.Search}>
      <input
        value={searchValue}
        onChange={handleChange}
        className={`${styles.Search__input} ${
          currentTheme === "dark"
            ? styles.lightThemeColors
            : styles.darkThemeColors
        }`}
        type="text"
        placeholder="Search Crypto"
      />
      <button
        onClick={() => handleSearch(searchValue)}
        className={styles.Search__button}
      >
        Search
      </button>
    </div>
  );
};

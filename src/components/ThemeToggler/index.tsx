import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { setTheme, toggleTheme } from "store/slices/themeSlice";
import { getCurrentTheme } from "store/selectors";

import whiteSun from "assets/white-sun.png";
import blackSun from "assets/black-sun.png";
import whiteMoon from "assets/white-moon.png";
import blackMoon from "assets/black-moon.png";
import styles from "./ThemeToggler.module.scss";

export const ThemeToggler = () => {
  const currentTheme = useSelector(getCurrentTheme);

  const dispatch = useDispatch();

  useEffect(() => {
    const themeStorageValue = localStorage.getItem("theme");

    if (themeStorageValue) {
      dispatch(setTheme(themeStorageValue as "dark" | "light"));
    }
  }, []);

  const onToggle = () => {
    localStorage.setItem("theme", currentTheme === "dark" ? "light" : "dark");
    dispatch(toggleTheme());
  };

  return (
    <div className={styles.togglerWrapper}>
      <img
        className={styles.icon}
        src={currentTheme === "dark" ? whiteMoon : blackMoon}
        alt="dark"
      />

      <label className={styles.togglerWrapper__switch}>
        <input
          type="checkbox"
          checked={currentTheme === "light"}
          onChange={onToggle}
        />
        <span
          className={`${styles.switch} ${
            currentTheme === "dark"
              ? styles.lightThemeColors
              : styles.darkThemeColors
          }`}
        />
      </label>

      <img
        className={styles.icon}
        src={currentTheme === "dark" ? whiteSun : blackSun}
        alt="light"
      />
    </div>
  );
};

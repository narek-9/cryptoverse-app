import React, { FC } from "react";
import { useSelector } from "react-redux";

import { getCurrentTheme } from "../../redux/selectors";

import styles from "./SelectButton.module.scss";

interface SelectButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  isSelected: boolean;
}

export const SelectButton: FC<SelectButtonProps> = ({
  onClick,
  children,
  isSelected,
}) => {
  const currentTheme = useSelector(getCurrentTheme);

  return (
    <button
      className={`${styles.selectButton} ${
        currentTheme === "dark"
          ? styles.lightThemeColors
          : styles.darkThemeColors
      } ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

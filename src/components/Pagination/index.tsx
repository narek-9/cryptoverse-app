import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { getCurrentTheme } from "../../redux/selectors";
import { coinsItem, searchCoin } from "../../types";

import { PaginationListItem } from "../../components/PaginationListItem";

import paginationArrow from "../../assets/pagination-arrow.png";
import styles from "./Pagination.module.scss";

interface PaginationProps<T> {
  cryptos: T[];
  leftLimit: number;
  setLeftLimit: (newPage: number) => void;
  setAnimationData: React.Dispatch<
    React.SetStateAction<{
      isAnimateTbody: boolean;
      animationSide: "left" | "right" | "none";
    }>
  >;
}

export const Pagination: FC<PaginationProps<coinsItem | searchCoin>> = ({
  cryptos,
  leftLimit,
  setLeftLimit,
  setAnimationData,
}) => {
  const [startMouseX, setStartMouseX] = useState<number | null>(null);
  const containerRef = useRef<HTMLUListElement>(null);

  const currentTheme = useSelector(getCurrentTheme);

  const pagesCount = Math.ceil(cryptos.length / 10);
  const pageRefs = useRef<Array<HTMLLIElement | null>>(
    Array(pagesCount).fill(null)
  );

  const isLeftBorder = leftLimit === 0;
  const isRightBorder = leftLimit === pagesCount - 1;

  const handlePaginationClick = (
    newPage: number,
    animationSide: "left" | "right"
  ) => {
    setAnimationData({
      isAnimateTbody: true,
      animationSide: animationSide,
    });

    setTimeout(() => {
      setLeftLimit(newPage);
      setAnimationData({
        isAnimateTbody: false,
        animationSide: "none",
      });

      const selectedPageRef = pageRefs.current[newPage];
      selectedPageRef && selectedPageRef.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLUListElement>) => {
    if (pagesCount > 10) {
      setStartMouseX(e.clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLUListElement>) => {
    if (pagesCount > 10) {
      if (startMouseX !== null && containerRef.current) {
        const difference = startMouseX - e.clientX;
        containerRef.current.scrollLeft += difference;
        setStartMouseX(e.clientX);
      }
    }
  };

  const handleMouseUp = () => {
    if (pagesCount > 10) {
      setStartMouseX(null);
    }
  };

  useEffect(() => {
    const preventBodyScroll = (e: Event) => {
      if (containerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    document.body.addEventListener("wheel", preventBodyScroll, {
      passive: false,
    });

    return () => {
      document.body.removeEventListener("wheel", preventBodyScroll);
    };
  }, []);

  return (
    <div className={styles.Pagination}>
      <div className={styles.Pagination__listsWrapper}>
        <ul>
          <PaginationListItem
            buttonClassNames={`${
              currentTheme === "dark"
                ? styles.arrowBtn__lightThemeColors
                : styles.arrowBtn__darkThemeColors
            } ${pagesCount < 2 ? styles.disabled : ""}`}
            isButtonDisabled={pagesCount < 2}
            onClick={() =>
              handlePaginationClick(
                isLeftBorder ? pagesCount - 1 : leftLimit - 1,
                "right"
              )
            }
          >
            <img src={paginationArrow} alt="prev" />
          </PaginationListItem>
        </ul>

        <ul
          className={pagesCount > 10 ? styles.grabbed : ""}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={(e) =>
            containerRef.current &&
            (containerRef.current.scrollLeft -= e.deltaY)
          }
          ref={containerRef}
        >
          {Array(pagesCount)
            .fill(0)
            .map((_, index) => {
              const onClick = () =>
                index !== leftLimit &&
                handlePaginationClick(
                  index,
                  index > leftLimit ? "left" : "right"
                );

              return (
                <PaginationListItem
                  // @ts-ignore
                  ref={(el) => (pageRefs.current[index] = el)}
                  buttonClassNames={`${
                    currentTheme === "dark"
                      ? styles.lightThemeColors
                      : styles.darkThemeColors
                  } ${
                    index === leftLimit
                      ? currentTheme === "dark"
                        ? styles.lightThemeColors__selected
                        : styles.darkThemeColors__selected
                      : ""
                  }`}
                  onClick={onClick}
                  key={index}
                >
                  {index + 1}
                </PaginationListItem>
              );
            })}
        </ul>

        <ul>
          <PaginationListItem
            buttonClassNames={`${styles.rotated} ${
              currentTheme === "dark"
                ? styles.arrowBtn__lightThemeColors
                : styles.arrowBtn__darkThemeColors
            } ${pagesCount < 2 ? styles.disabled : ""}`}
            isButtonDisabled={pagesCount < 2}
            onClick={() =>
              handlePaginationClick(isRightBorder ? 0 : leftLimit + 1, "left")
            }
          >
            <img src={paginationArrow} alt="next" />
          </PaginationListItem>
        </ul>
      </div>
    </div>
  );
};

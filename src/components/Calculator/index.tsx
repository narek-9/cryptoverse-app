import { FC, useEffect, useState } from "react";

import { coinsItem } from "types";

import downArrow from "assets/down-arrow.png";
import calculator from "assets/calculator.png";
import styles from "./Calculator.module.scss";

interface CalculatorProps {
  cryptos: coinsItem[];
}

export const Calculator: FC<CalculatorProps> = ({ cryptos }) => {
  const [isCalculatorVisible, setIsCalculatorVisible] =
    useState<boolean>(false);
  const [firstInputValue, setFirstInputValue] = useState<string>("");
  const [secondInputValue, setSecondInputValue] = useState<string>("0");

  const [firstSelectedCrypto, setFirstSelectedCrypto] =
    useState<coinsItem | null>(cryptos[0]);
  const [secondSelectedCrypto, setSecondSelectedCrypto] =
    useState<coinsItem | null>(cryptos[0]);

  useEffect(() => {
    setFirstSelectedCrypto(cryptos[0]);
    setSecondSelectedCrypto(cryptos[0]);
  }, [cryptos]);

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setSelectedCrypto: React.Dispatch<React.SetStateAction<coinsItem | null>>,
    value: "firstSelectedCrypto" | "secondSelectedCrypto"
  ) => {
    const selectedCrypto = cryptos.find(
      (crypto) => crypto.id === e.target.value
    );
    setSelectedCrypto(selectedCrypto || null);

    let ratio;

    if (value === "firstSelectedCrypto") {
      ratio =
        ((firstSelectedCrypto?.current_price || 1) * Number(firstInputValue)) /
        (selectedCrypto?.current_price || 1);
    } else {
      ratio =
        ((selectedCrypto?.current_price || 1) * Number(firstInputValue)) /
        (secondSelectedCrypto?.current_price || 1);
    }

    setSecondInputValue(String(ratio));
  };

  const isValidInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < firstInputValue.length) {
      return true;
    }

    const char = e.nativeEvent.data as string;

    if (char === " ") {
      return false;
    }

    if (
      char !== "." &&
      e.target.value[0] === "0" &&
      e.target.value.length === 2
    ) {
      return false;
    }

    if (firstInputValue && !firstInputValue.includes(".") && char === ".") {
      return true;
    }

    if (!isNaN(Number(char))) {
      return true;
    }

    return false;
  };

  return (
    <div className={styles.Calculator}>
      <button
        className={styles.Calculator__icon}
        onClick={() => setIsCalculatorVisible((prev) => !prev)}
      >
        <img src={calculator} alt="" />
      </button>
      <div
        className={`${styles.Calculator__blocksWrapper} ${
          isCalculatorVisible ? styles.visible : ""
        }`}
      >
        <div className={styles.Calculator__blocksWrapper__block}>
          <div className={styles.Calculator__blocksWrapper__block__select}>
            <select
              name=""
              id=""
              onChange={(e) => {
                handleSelectChange(
                  e,
                  setFirstSelectedCrypto,
                  "secondSelectedCrypto"
                );
              }}
            >
              {cryptos.map((crypto) => (
                <option value={crypto.id} id={crypto.id} key={crypto.id}>
                  {crypto.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.Calculator__blocksWrapper__block__input}>
            <input
              type="text"
              id="firstAmount"
              value={firstInputValue}
              onChange={(e) => {
                if (!firstInputValue && e.nativeEvent.data === ".") {
                  setFirstInputValue("0.");
                } else if (isValidInputValue(e)) {
                  setFirstInputValue(e.target.value);

                  const ratio =
                    ((firstSelectedCrypto?.current_price || 1) *
                      Number(e.target.value)) /
                    (secondSelectedCrypto?.current_price || 1);

                  setSecondInputValue(String(ratio));
                }
              }}
            />
          </div>
        </div>
        <img src={downArrow} alt="To" />
        <div className={styles.Calculator__blocksWrapper__block}>
          <div className={styles.Calculator__blocksWrapper__block__select}>
            <select
              name=""
              id=""
              onChange={(e) => {
                handleSelectChange(
                  e,
                  setSecondSelectedCrypto,
                  "firstSelectedCrypto"
                );
              }}
            >
              {cryptos.map((crypto) => (
                <option value={crypto.id} id={crypto.id} key={crypto.id}>
                  {crypto.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.Calculator__blocksWrapper__block__input}>
            <input
              type="text"
              id="firstAmount"
              value={secondInputValue}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

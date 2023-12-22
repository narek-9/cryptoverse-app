import { Link } from "react-router-dom";

import { ThemeToggler } from "../../components/ThemeToggler";

import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header>
      <div className={styles.headerWrapper}>
        <ThemeToggler />

        <div className={styles.headerWrapper__title}>
          <h2>
            <Link to="/">Cryptoverse</Link>
          </h2>
        </div>
      </div>
    </header>
  );
};

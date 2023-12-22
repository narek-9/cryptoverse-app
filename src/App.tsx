import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { getCurrentTheme } from "store/selectors";
import { routes } from "./routes";

import { Header } from "components/Header";

import styles from "./App.module.scss";

export const App = () => {
  const currentTheme = useSelector(getCurrentTheme);

  return (
    <div
      className={`${
        currentTheme === "dark" ? styles["bg-black"] : styles["bg-white"]
      }`}
    >
      <Header />
      <main>
        <Routes>
          {routes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Routes>
      </main>
    </div>
  );
};

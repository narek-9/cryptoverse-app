import { CoinPage } from "./pages/CoinPage";
import { HomePage } from "./pages/HomePage";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/cryptos/:id",
    element: <CoinPage />,
  },
];

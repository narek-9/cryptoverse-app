import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AliceCarousel from "react-alice-carousel";

import { getCryptosData, getCurrentTheme } from "../../redux/selectors";

import { Loading } from "../../components/Loading";

import "react-alice-carousel/lib/alice-carousel.css";
import styles from "./Carousel.module.scss";

export const Carousel = () => {
  const cryptosData = useSelector(getCryptosData);
  const currentTheme = useSelector(getCurrentTheme);

  const items = cryptosData.data.slice(0, 20).map((crypto) => (
    <Link
      to={`/cryptos/:${crypto.id}`}
      className={`${styles.topCrypto} ${
        currentTheme === "dark"
          ? styles.darkThemeColors
          : styles.lightThemeColors
      }`}
      key={crypto.id}
    >
      <img src={crypto.image} alt={crypto.name} />
      <h3>
        {crypto.symbol.toUpperCase()}
        <span
          className={`${
            crypto.price_change_24h > 0
              ? styles.topCrypto__greenText
              : styles.topCrypto__redText
          }`}
        >{`${
          crypto.price_change_24h > 0 ? "+" : ""
        }${crypto.price_change_24h.toFixed(2)}`}</span>
      </h3>
      <p className={styles.topCrypto__price}>
        $ {crypto.current_price.toFixed(2)}
      </p>
    </Link>
  ));

  const responsive = {
    0: {
      items: 2,
    },
    700: {
      items: 4,
    },
  };
  if (cryptosData.loading) {
    return <Loading />;
  }

  return (
    <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items}
    />
  );
};

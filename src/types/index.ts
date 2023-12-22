export type coinsItem = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: roi | null;
  last_updated: string;
};

type roi = {
  currency: string;
  percentage: number;
  times: number;
};

export type searchCoin = {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};

export type coin = {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: string | null;
  platforms: {
    [key in string]: string;
  };
  detail_platforms: {
    [key in string]: {
      decimal_place: null | number;
      contract_address: string;
    };
  };
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  preview_listing: boolean;
  public_notice: null;
  additional_notices: [];
  localization: {
    [key in string]: string;
  };
  description: {
    [key in string]: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: string | null;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data: {
    current_price: {
      [key in string]: number;
    };

    total_value_locked: number | null;
    mcap_to_tvl_ratio: number | null;
    fdv_to_tvl_ratio: number | null;
    roi: roi | null;
    ath: {
      [key in string]: number;
    };
    ath_change_percentage: {
      [key in string]: number;
    };
    ath_date: {
      [key in string]: string;
    };
    atl: {
      [key in string]: number;
    };
    atl_change_percentage: {
      [key in string]: number;
    };
    atl_date: {
      [key in string]: string;
    };
    market_cap: {
      [key in string]: number;
    };
    market_cap_rank: number;
    fully_diluted_valuation: {
      [key in string]: number;
    };
    market_cap_fdv_ratio: number;
    total_volume: {
      [key in string]: number;
    };
    high_24h: {
      [key in string]: number;
    };
    low_24h: {
      [key in string]: number;
    };
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: {
      [key in string]: number;
    };
    price_change_percentage_1h_in_currency: {
      [key in string]: number;
    };
    price_change_percentage_24h_in_currency: {
      [key in string]: number;
    };
    price_change_percentage_7d_in_currency: {
      [key in string]: number;
    };
    price_change_percentage_14d_in_currency: {
      [key in string]: number;
    };
    price_change_percentage_30d_in_currency: {
      [key in string]: number;
    };
    price_change_percentage_60d_in_currency: {
      [key in string]: number;
    };
    price_change_percentage_200d_in_currency: {
      [key in string]: number;
    };
    price_change_percentage_1y_in_currency: {
      [key in string]: number;
    };
    market_cap_change_24h_in_currency: {
      [key in string]: number;
    };
    market_cap_change_percentage_24h_in_currency: {
      [key in string]: number;
    };

    total_supply: number;
    max_supply: number;
    circulating_supply: number;
    last_updated: string;
  };
  public_interest_stats: {
    alexa_rank: number;
    bing_matches: null;
  };
  status_updates: [];
  last_updated: string;
};

export type cryptoChartData = {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
};

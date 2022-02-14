/**
 * @type Name screen
 */
export type RootStackParamList = {
  test: undefined;
  BottomTab: undefined;
  BLogDetails: BLogDetails;
  Language: undefined;
  WatchListStyle: undefined;
  ListMarket: undefined;
  ListExchange: undefined;
  CurrencyScreen: undefined;
  DetailCoin: DetailCoin;
  MyModal: undefined;
};

/**
 * @type passing param
 */
export type BLogDetails = {
  title: string;
  url: string;
};
export type DetailCoin = {
  id?: string;
};

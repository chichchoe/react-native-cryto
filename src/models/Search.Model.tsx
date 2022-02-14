export interface SearchModel {
  coins: CoinSearch[];
  exchanges: ExchangeSearch[];
  icos: any[];
  categories: CategorySearch[];
}

export interface CategorySearch {
  id: null | string;
  name: null | string;
}

export interface CoinSearch {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

export interface ExchangeSearch {
  id: string;
  name: string;
  market_type: MarketType;
  thumb: string;
  large: string;
}

export enum MarketType {
  Spot = 'spot',
}

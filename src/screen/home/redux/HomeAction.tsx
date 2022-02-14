import {URL_COINGECKO} from '../../../common/Common';
import {
  CoinMarket,
  ExchangesModel,
  GlobalModel,
  IResponseGlobal,
} from '../../../models';

export enum HOME_ACTION {
  HOME_SUCCESS = '@HOME_ACTION/LIST_SUCCESS',
  HOME_REFRESH = '@HOME_ACTION/LIST_REFRESH',
  HOME_FAIL = '@HOME_ACTION/LIST_FAIL',
}
export type payloadHome = {
  arrListTenMarkets?: CoinMarket[];
  arrListTenExchanges?: ExchangesModel[];
  objGlobal?: GlobalModel;
  isFistLoading?: boolean;
  dataChartPie: dataChart[];
  isRefresh?: boolean;
  isError?: boolean;
};

export type dataChart = {
  x: string;
  y: number;
};
export const getAllHome = () => {
  return async (
    dispatch: (arg0: {type: string; payload?: payloadHome}) => void,
  ) => {
    try {
      const listMarket = await fetch(
        URL_COINGECKO +
          'coins/markets/?vs_currency=usd&per_page=10&page=1&sparkline=true',
      );
      const jsonListMarket: CoinMarket[] = await listMarket.json();

      const listExchanges = await fetch(
        URL_COINGECKO + 'exchanges?per_page=10&page=1',
      );
      const jsonListExchanges: ExchangesModel[] = await listExchanges.json();

      const listGlobal = await fetch(URL_COINGECKO + 'global');
      const jsonGlobal: IResponseGlobal = await listGlobal.json();
      const dataGlobal: GlobalModel = jsonGlobal.data || {};
      const marketCapPercentage = dataGlobal.market_cap_percentage;
      let dataConvertChart: dataChart[] = [];
      let countChart = 0;
      for (const property in marketCapPercentage) {
        const populationConver =
          Math.round(marketCapPercentage[property] * 100) / 100;
        if (dataConvertChart.length < 3) {
          countChart = Math.round((countChart + populationConver) * 100) / 100;
          const axisX: string =
            property.toUpperCase() + '\n' + String(populationConver) + '%';
          dataConvertChart.push({
            x: axisX,
            y: populationConver,
          });
        }
      }

      dataConvertChart.push({
        x: 'Other\n' + String(100 - countChart) + '%',
        y: 100 - countChart,
      });

      Promise.all([
        jsonListMarket,
        jsonListExchanges,
        dataGlobal,
        dataConvertChart,
      ])
        .then(value => {
          dispatch({
            type: HOME_ACTION.HOME_SUCCESS,
            payload: {
              arrListTenMarkets: value[0] || [],
              arrListTenExchanges: value[1] || [],
              objGlobal: value[2] || {},
              dataChartPie: value[3],
            },
          });
        })
        .catch(_err => {
          dispatch({
            type: HOME_ACTION.HOME_FAIL,
          });
        });
    } catch (error) {
      dispatch({
        type: HOME_ACTION.HOME_FAIL,
      });
    }
  };
};

export const refresh = () => {
  return async (dispatch: (arg0: any) => void) => {
    dispatch({type: HOME_ACTION.HOME_REFRESH});
    dispatch(getAllHome());
  };
};

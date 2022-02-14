import {HOME_ACTION, payloadHome} from './HomeAction';

const initialState: payloadHome = {
  arrListTenMarkets: [],
  arrListTenExchanges: [],
  objGlobal: undefined,
  dataChartPie: [],
  isFistLoading: true,
  isRefresh: false,
  isError: false,
};

const HomeReducer = (
  state = initialState,
  action: {type: any; payload: payloadHome},
) => {
  switch (action.type) {
    case HOME_ACTION.HOME_REFRESH:
      return {...state, isRefresh: true};
    case HOME_ACTION.HOME_SUCCESS:
      return {
        ...state,
        arrListTenMarkets: action.payload.arrListTenMarkets,
        arrListTenExchanges: action.payload.arrListTenExchanges,
        objGlobal: action.payload?.objGlobal,
        dataChartPie: action.payload?.dataChartPie,
        isRefresh: false,
        isFistLoading: false,
      };
    default:
      return state;
  }
};

export default HomeReducer;

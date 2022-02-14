import {ThemeInterface} from '../../interface';

export const SWITCH_THEME = 'SWITCH_THEME';
export const SWITCH_CARD_HOME = 'SWITCH_CARD_HOME';
export const SWITCH_CURRENCY = 'SWITCH_CURRENCY';

// dispatch actions
export const switchTheme = (BaseTheme: ThemeInterface) => {
  return (
    dispatch: (arg0: {type: string; payload: ThemeInterface}) => void,
  ) => {
    dispatch({
      type: SWITCH_THEME,
      payload: BaseTheme,
    });
  };
};

export const switchCardHome = (card: 'CardView' | 'TradeView') => {
  return (
    dispatch: (arg0: {type: string; payload: 'CardView' | 'TradeView'}) => void,
  ) => {
    dispatch({
      type: SWITCH_CARD_HOME,
      payload: card,
    });
  };
};
export const switchCurrency = (currency: string) => {
  return (dispatch: (arg0: {type: string; payload: string}) => void) => {
    dispatch({
      type: SWITCH_CURRENCY,
      payload: currency,
    });
  };
};

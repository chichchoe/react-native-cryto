import {lightTheme} from '../../theme';
import {SWITCH_CARD_HOME, SWITCH_THEME} from './action';

const initialState = {
  theme: {...lightTheme},
  cardHome: 'TradeView',
  currency: {},
};

const themeReducer = (
  state = initialState,
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    case SWITCH_THEME:
      let newState = {
        ...state,
        theme: {...state.theme, ...action.payload},
      };
      return newState;
    case SWITCH_CARD_HOME:
      let currentCardHome = {
        ...state,
        cardHome: action.payload,
      };
      return currentCardHome;
    case SWITCH_CARD_HOME:
      return {...state, currency: action.payload};
    default:
      return state;
  }
};

export default themeReducer;

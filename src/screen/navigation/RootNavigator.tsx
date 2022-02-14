import * as React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTab';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import TestScreen from '../TestScreen';
import RNBootSplash from 'react-native-bootsplash';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList, ThemeInterface} from '../../interface';
import MyStorage from '../../utils/MyStorage';

import {switchCardHome, switchTheme} from '../redux/action';
import DetailScreen from '../blog/components/DetailScreen';
import LanguageScreen from '../settings/components/LanguageScreen';
import {useTranslation} from 'react-i18next';
import {KEY_STORAGE} from '../../common/KeyStorages';
import {translation} from '../../translations';
import WatchListStyleScreen from '../settings/components/WatchListStyle';
import ListMarket from '../listTopCoin/ListMarketScreen';
import CurrencyScreen from '../settings/components/CurrencyScreen';
import ListExchangeScreen from '../listExchange/ListExchangeScreen';
import DetailCoinScreen from '../listTopCoin/detailCoin/DetailCoinScreen';
import MyNavigator from '../../utils/Mynavigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  let navigation: any;
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const props = useSelector((state: any) => state.themeReducer);

  async function onReady() {
    const getTheme: ThemeInterface = await MyStorage.get(
      KEY_STORAGE.THEME_SHOP,
    );

    const getCard: 'CardView' | 'TradeView' = await MyStorage.get(
      KEY_STORAGE.CARD_SHOP,
    );
    dispatch(switchCardHome(getCard));
    dispatch(switchTheme(getTheme));
    Promise.all([getTheme, getCard])
      .then(_value => {
        RNBootSplash.hide();
      })
      .catch(_err => {});
  }
  return (
    <ThemeProvider theme={props.theme}>
      <NavigationContainer
        theme={props.theme.mode === 'dark' ? DarkTheme : DefaultTheme}
        ref={MyNavigator.rootNavigator}
        onReady={onReady}
        onStateChange={() => {
          if (__DEV__) {
            if (navigation) {
              const state = navigation.getCurrentRoute().name;
              console.log(state);
            }
          }
        }}>
        <RootStack.Navigator
          screenOptions={{animation: 'slide_from_right'}}
          initialRouteName="BottomTab">
          <RootStack.Screen
            name="BottomTab"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="test"
            component={TestScreen}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Language"
            component={LanguageScreen}
            options={{
              headerTitle: t(translation.languageSelector),
            }}
          />
          <RootStack.Screen
            name="WatchListStyle"
            component={WatchListStyleScreen}
            options={{
              headerTitle: t(translation.watchListStyle),
            }}
          />
          <RootStack.Screen
            name="CurrencyScreen"
            component={CurrencyScreen}
            options={{
              headerTitle: t(translation.currency),
            }}
          />
          <RootStack.Screen
            name="ListMarket"
            component={ListMarket}
            options={{
              headerTitle: 'List coin',
            }}
          />
          <RootStack.Screen
            name="ListExchange"
            component={ListExchangeScreen}
          />
          <RootStack.Screen name="BLogDetails" component={DetailScreen} />
          <RootStack.Screen name="DetailCoin" component={DetailCoinScreen} />
          {/* <RootStack.Screen
            options={{
              presentation: 'fullScreenModal',
              animation: 'fade_from_bottom',
              gestureEnabled: true,
              headerShown: false,
            }}
            name="MyModal"
            component={ModalScreen}
          /> */}
        </RootStack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

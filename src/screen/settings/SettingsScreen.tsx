import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Pressable, Switch} from 'react-native';
import {
  Container,
  ItemSetting,
  Name,
} from '../../components/BaseStylesComponent';
import {switchTheme} from '../redux/action';
import {darkTheme, lightTheme} from '../../theme';
import MyStorage from '../../utils/MyStorage';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SettingStyle} from './styles/Setting.Styles';
import {KEY_STORAGE} from '../../common/KeyStorages';
import {translation} from '../../translations';
import {RootState} from '../redux';
import MyNavigator from '../../utils/Mynavigation';
import analytics from '@react-native-firebase/analytics';

export default function SettingsScreen() {
  const dispatch = useDispatch();

  const props = useSelector((state: RootState) => state.themeReducer);
  const {t} = useTranslation();

  const toggleSwitch = () => {
    if (props.theme.mode === 'light') {
      MyStorage.create(KEY_STORAGE.THEME_SHOP, darkTheme);
      dispatch(switchTheme(darkTheme));
    } else {
      MyStorage.create(KEY_STORAGE.THEME_SHOP, lightTheme);
      dispatch(switchTheme(lightTheme));
    }
  };
  return (
    <Container>
      <Pressable
        onPress={() => {
          MyNavigator.navigate('CurrencyScreen');
        }}>
        <ItemSetting>
          <Name style={SettingStyle.Name}>{t(translation.currency)}</Name>
          <Ionicons
            name={'chevron-forward-sharp'}
            size={24}
            color={'#767577'}
          />
        </ItemSetting>
      </Pressable>
      <Pressable
        onPress={() => {
          MyNavigator.navigate('WatchListStyle');
        }}>
        <ItemSetting>
          <Name style={SettingStyle.Name}>{t(translation.watchListStyle)}</Name>
          <Ionicons
            name={'chevron-forward-sharp'}
            size={24}
            color={'#767577'}
          />
        </ItemSetting>
      </Pressable>
      <Pressable
        onPress={() => {
          MyNavigator.push('Language');
        }}>
        <ItemSetting>
          <Name style={SettingStyle.Name}>
            {t(translation.languageSelector)}
          </Name>
          <Ionicons
            name={'chevron-forward-sharp'}
            size={24}
            color={'#767577'}
          />
        </ItemSetting>
      </Pressable>
      <ItemSetting>
        <Name style={SettingStyle.Name}>{t(translation.theme)} </Name>
        <Switch
          trackColor={{false: '#767577', true: '#f4f3f4'}}
          thumbColor={props.theme.mode === 'light' ? '#FF9C24' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={props.theme.mode === 'light'}
        />
      </ItemSetting>
      <Button
        title="Add To Basket"
        onPress={async () =>
          await analytics().logEvent('SettingsScreen', {
            id: 3745092,
            item: 'mens grey t-shirt',
            description: ['round neck', 'long sleeved'],
            size: 'L',
          })
        }
      />
    </Container>
  );
}

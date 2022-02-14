import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../home/HomeScreen';
import SettingsScreen from '../settings/SettingsScreen';
import BlogScreen from '../blog/BlogScreen';
import {BottomTabParamList} from '../../interface';
import {useTranslation} from 'react-i18next';
import SearchScreen from '../search/SearchScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = '';

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search-sharp' : 'search-outline';
          } else if (route.name === 'Blog') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#10BFFF',
        tabBarInactiveTintColor: '#85826F',
        // headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('navigate:home'),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false, tabBarLabel: t('navigate:Search')}}
      />
      <Tab.Screen
        name="Blog"
        component={BlogScreen}
        options={{headerShown: false, tabBarLabel: t('navigate:blog')}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false, tabBarLabel: t('navigate:settings')}}
      />
    </Tab.Navigator>
  );
}

import React from 'react';
import {Provider} from 'react-redux';
import {RootNavigator} from './src/screen/navigation';
import configureStore from './src/screen/redux/ConfigureStore';
import './src/translations/IMLocalize';
import Toast from 'react-native-toast-message';
import {
  requestUserPermission,
  requestUserTokenDevice,
} from './src/config/Notification';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const store = configureStore();
export default function App() {
  React.useEffect(() => {
    requestUserTokenDevice();
    requestUserPermission();
  }, []);
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <Provider store={store}>
      <RootNavigator />
      <Toast position="top" bottomOffset={20} />
    </Provider>
  );
}

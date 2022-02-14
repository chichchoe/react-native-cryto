import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
export const requestUserTokenDevice = () => {
  messaging()
    .getToken()
    .then(token => {
      if (__DEV__) {
        console.log(token);
      }
      AsyncStorage.setItem('@notification_Key', token);
    })
    .catch(e => {
      console.log(e);
    });

  messaging().onTokenRefresh(token => {
    // Utilities.log('---refresh token---');
    // console.log(token);
    AsyncStorage.setItem('@notification_Key', token);
  });
};

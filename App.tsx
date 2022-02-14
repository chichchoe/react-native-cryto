import React from 'react';
import {Provider} from 'react-redux';
import {RootNavigator} from './src/screen/navigation';
import configureStore from './src/screen/redux/ConfigureStore';
import './src/translations/IMLocalize';
import Toast from 'react-native-toast-message';

const store = configureStore();
export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
      <Toast position="top" bottomOffset={20} />
    </Provider>
  );
}

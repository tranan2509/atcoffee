import React from 'react';
import AppContainer from './src/navigation/AppContainer';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import store from './src/stores/store';
import {Provider} from 'react-redux';
import {navigationRef} from './src/navigation/navigationRef';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <AppContainer />
    </NavigationContainer>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

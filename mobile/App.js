import React from 'react';
import AppContainer from './src/navigation/AppContainer';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import store from './src/stores/store';
import {Provider} from 'react-redux';
import {navigationRef} from './src/navigation/navigationRef';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  // const getToken = async () => {
  //   const token = await messaging().getToken();
  //   console.log('token..........', token);
  // };

  // React.useEffect(() => {
  //   getToken();

  //   messaging().onMessage(async remoteMessage => {
  //     PushNotification.getChannels(function (channel_ids) {
  //       console.log(channel_ids); // ['channel_id_1']
  //     });
  //     Alert.alert(
  //       remoteMessage.notification.title,
  //       remoteMessage.notification.body,
  //       // [
  //       //   {
  //       //     text: 'Bỏ qua',
  //       //     onPress: () => {},
  //       //     style: 'cancel',
  //       //   },
  //       //   {text: 'OK', onPress: () => {}},
  //       // ],
  //     );
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //
  //   });
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       JSON.stringify(remoteMessage),
  //     );
  //   });
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           JSON.stringify(remoteMessage),
  //         );
  //       }
  //     });
  // }, []);

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

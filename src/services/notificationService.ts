import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
let _foregroundListenerUnsubscribe: (() => void) | null = null;

export async function requestUserPermission() {
  if (Platform.OS === 'android') {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } catch (e) {
      console.warn('Notification permission request failed', e);
    }
  }

  const authStatus = await messaging().requestPermission();

  console.log('Auth Status:', authStatus);
}

export async function getFCMToken() {
  const token = await messaging().getToken();

  console.log('FCM Token:', token);

  return token;
}

/**
 * Sets up a single foreground message listener. If @notifee/react-native is
 * installed it will display a local notification so users see a banner while
 * the app is in the foreground. This function is idempotent — calling it
 * multiple times will register the listener only once.
 */
export function setupForegroundListener() {
            console.log('Showing local notification');

  if (_foregroundListenerUnsubscribe) {
    // Already registered
    return _foregroundListenerUnsubscribe;
  }

  _foregroundListenerUnsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('Foreground Message:', remoteMessage);

    // Try to use notifee if available for showing a native notification
    // try {
    //   // dynamic require so code still works if notifee isn't installed
    //   // eslint-disable-next-line @typescript-eslint/no-var-requires
    //   notifee = require('@notifee/react-native');
    // } catch (e) {
    //   notifee = undefined;
    // }
console.log(notifee)
    if (notifee) {
      try {
        // const {AndroidImportance} = notifee;
        await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          importance: AndroidImportance.HIGH,
        });
        console.log('Showing local notification');
        await notifee.displayNotification({
          title: remoteMessage.notification?.title || 'Notification',
          body: remoteMessage.notification?.body || '',
          android: {
            channelId: 'default',
            pressAction: {id: 'default'},
          },
        });
        console.log('Notification displayed');
      } catch (err) {
        console.warn('Failed to display notifee notification', err);
      }
    } else {
      // Fallback: show an in-app alert so the user sees something while
      // notifee is not installed. Recommend installing notifee for banners.
      Alert.alert(
        remoteMessage.notification?.title || 'Notification',
        remoteMessage.notification?.body || '',
      );
    }
  });

  return _foregroundListenerUnsubscribe;
}

export function removeForegroundListener() {
  if (_foregroundListenerUnsubscribe) {
    try {
      _foregroundListenerUnsubscribe();
    } catch (e) {
      // ignore
    }
    _foregroundListenerUnsubscribe = null;
  }
}
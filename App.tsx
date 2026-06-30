import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';

// foreground listener moved to notificationService; notifee used conditionally there

import {
  requestUserPermission,
  getFCMToken,
  setupForegroundListener,
  removeForegroundListener,
} from './src/services/notificationService';

function App() {
  useEffect(() => {
    requestUserPermission();
    getFCMToken();

    // centralised foreground handler (idempotent)
    console.log('Setting up foreground listener');
    setupForegroundListener();

    return () => {
      // cleanup listener on unmount
      removeForegroundListener();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
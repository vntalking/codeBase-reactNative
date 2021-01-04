/**
 * Olly Owners App
 * created by: Basil Arackal
 * created on: Nov 5, 2020
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootSwitchNavigator, {
  navigationRef,
  isReadyRef,
} from './routes/RootSwitchNavigator.js';
import {AuthContextProvider} from './context/AuthContext';
import {AppContextProvider} from './context/AppContext';
// import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}>
          <RootSwitchNavigator />
        </NavigationContainer>
        {/* <FlashMessage position="top" /> */}
      </AppContextProvider>
    </AuthContextProvider>
  );
};

export default App;

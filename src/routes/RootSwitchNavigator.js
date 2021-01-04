import React, {useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import AuthSwitchNavigator from './AuthSwitchNavigator';
import TabsNavigator from './TabsNavigator';
import {AuthContext} from '../context/AuthContext';

const Stack = createStackNavigator();
export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();
export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  } else {
    console.log('Not mounted');
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

const RootSwitchNavigator = () => {
  const {isUserLoggedin, authStateLoading} = useContext(AuthContext);

  if (authStateLoading) {
    return (
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  } else {
    return isUserLoggedin ? <TabsNavigator /> : <AuthSwitchNavigator />;
  }
};

export default RootSwitchNavigator;

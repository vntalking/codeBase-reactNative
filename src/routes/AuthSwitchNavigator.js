import React, {useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();
const AuthSwitchNavigator = () => {
  //   const authStateLoading = true;
  //   const isUserLoggedin = true;

  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthSwitchNavigator;

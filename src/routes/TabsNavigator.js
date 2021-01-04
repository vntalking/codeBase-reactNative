import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../styles';
import {AppContext} from '../context/AppContext';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;

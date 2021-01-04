import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Fonts, Layout} from '../styles';

const SplashScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
  );
};
const styles = StyleSheet.create({container: {}});
export default SplashScreen;

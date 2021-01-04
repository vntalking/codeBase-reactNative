// Wrapper for AsyncStorage library
import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    // console.log(`${key} & ${value} set successfully in localStorage`);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      throw `No Value for "${key}" in Storage`;
    }
    return value;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    // console.log(`${key} removed  successfully from localStorage`);
  } catch (e) {
    console.log(e);
  }
};

// Non Util Functions
const getUserAccessToken = async () => await getItem('user_access_token');
const setUserAccessToken = async (access_token) =>
  await setItem('user_access_token', access_token);

const logOut = async () => {
  await removeItem('user_access_token');
};

export default {
  getUserAccessToken,
  setUserAccessToken,
  logOut,
};

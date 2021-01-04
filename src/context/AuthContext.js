/*
  Context for storing data and functions related to authentication
*/

import React, {createContext, useState} from 'react';
// import { login } from '../api';
import {Storage} from '../utils';

// default values
const initialAuthState = {
  authStateLoading: true,
  isUserLoggedin: false,
  access_token: null,
};

// Context Object
export const AuthContext = createContext();
//Context Components
export const AuthContextProvider = ({children}) => {
  const [val, setVal] = useState(initialAuthState);
  /*
    Function to store authentication tokens, mail id and onboarding status
    after a successfull login and update them in state
  */
  const loginUser = (access_token) => {
    Storage.setUserAccessToken(access_token);
    setVal({
      ...initialAuthState,
      access_token,
      authStateLoading: false,
      isUserLoggedin: true,
    });
  };

  const logoutUser = () => {
    Storage.logOut();
    setVal({...initialAuthState, authStateLoading: false});
  };

  /*
    Function to read tokens, onboarding tutorial screen showed
    status and mailId from storage
  */
  const checkAuthState = async () => {
    try {
      const access_token = await Storage.getUserAccessToken();
      loginUser(access_token);
    } catch (e) {
      logoutUser();
    }
  };

  //Function to authenticate user with email and password
  const loginUserWithCredentials = async (phone, password) => {
    try {
      const PAYLOAD = {phone, password};
      const {access_token} = await login(PAYLOAD);
      loginUser(access_token);
    } catch (e) {
      throw e;
    }
  };

  const value = {
    ...val,
    loginUserWithCredentials,
    logoutUser,
    checkAuthState,
    loginUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

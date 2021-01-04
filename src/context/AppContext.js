import React, {createContext, useEffect, useState} from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
  const value = {};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// src/context/AppState.js
import React, { createContext, useReducer } from 'react';
import { appReducer, initialState } from './AppReducer';

// Context'i dışa aktar (Named Export)
export const AppContext = createContext();

// Context Provider'ı dışa aktar (Default Export)
export const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Bu satırın varlığı, App.js dosyasındaki import'a uyar
export default AppState;
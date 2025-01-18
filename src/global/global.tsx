import React, { createContext, useContext } from "react";
import { GlobalContextManager } from "src/global/globalContext";

interface GlobalContextType {
  globalContextManager: GlobalContextManager;
}

const GlobalContext = createContext({} as GlobalContextType);

function GlobalProvider({ children }: { children: React.ReactNode }) {
  const globalContextManager = new GlobalContextManager();

  return (
    <GlobalContext.Provider value={{ globalContextManager }}>
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobalContext() {
  return useContext(GlobalContext);
}

export { GlobalProvider, useGlobalContext };

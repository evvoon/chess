// React context used so you dont have to pass props from component to component
// it can be directly taken

import { createContext, useContext } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export { AppContext };

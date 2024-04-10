import { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import { initGame } from "./constant";
import { AppContext } from "./contexts/Context";
import { useReducer } from "react";
import { reducer } from "./reducer/reducer";

export default function App() {
  const [appState, dispatch] = useReducer(reducer, initGame);

  const providerState = {
    appState,
    dispatch,
  };

  return (
    <AppContext.Provider value={providerState}>
      <div className="App">
        <Board />
      </div>
    </AppContext.Provider>
  );
}

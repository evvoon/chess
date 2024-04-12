import { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import { initGame } from "./constant";
import { AppContext } from "./contexts/Context";
import { useReducer } from "react";
import { reducer } from "./reducer/reducer";
import MovesList from "./components/Control/bits/MovesList";
import Control from "./components/Control/Control";
import TakeBack from "./components/Control/bits/TakeBack";

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
        <Control>
          <MovesList />
          <TakeBack />
        </Control>
      </div>
    </AppContext.Provider>
  );
}

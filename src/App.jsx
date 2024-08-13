import { useState, useEffect } from "react";
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
  const [gameStarted, setGameStarted] = useState(false);

  const providerState = {
    appState,
    dispatch,
  };

  useEffect(() => {
    const handleDragStart = () => {
      setGameStarted(true);
    };

    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return (
    <AppContext.Provider value={providerState}>
      <div className="App">
        {!gameStarted && (
          <div className="start-message">Drag the pieces to start</div>
        )}
        <Board />
        <Control>
          <MovesList />
          <TakeBack />
        </Control>
      </div>
    </AppContext.Provider>
  );
}

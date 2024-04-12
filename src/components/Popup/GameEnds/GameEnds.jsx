import { Status } from "../../../constant";
import { useAppContext } from "../../../contexts/Context";
import { copyPosition } from "../../../helper";
import { clearCandidates, makeNewMove } from "../../../reducer/actions/move";
import "./GameEnds.css";
import "../Popup.css";
import { setupNewGame } from "../../../reducer/actions/game";

export default function Popup({ onClosePopup }) {
  const {
    appState: { status },
    dispatch,
  } = useAppContext();

  if (status === Status.ongoing || status === Status.promoting) return null;

  const newGame = () => {
    dispatch(setupNewGame());
  };

  const isWin = status.endsWith("wins");

  return (
    <div className="popup--inner popup--inner__center">
      <h1>{isWin ? status : "Draw"}</h1>
      <p>{!isWin && status}</p>
      <div className={status}></div>
      <button onClick={newGame}>New Game</button>
    </div>
  );
}

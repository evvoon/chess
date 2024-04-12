import arbiter from "../../arbiter/arbiter";
import { useAppContext } from "../../contexts/Context";
import { generateCandidateMoves } from "../../reducer/actions/move";

export default function Piece({ rank, file, piece }) {
  const { appState, dispatch } = useAppContext();
  const { turn, position, castleDirection } = appState;
  const currentPosition = position[position.length - 1];

  const onDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece}, ${rank}, ${file}`);
    setTimeout(() => {
      e.target.style.display = "none";
    }, 0); // delay of 0
    if (turn === piece[0]) {
      const candidateMoves = arbiter.getValidMoves({
        position: currentPosition, // yes
        prevPosition: position[position.length - 2],
        castleDirection: castleDirection[turn],
        piece,
        rank,
        file,
      });
      dispatch(generateCandidateMoves({ candidateMoves }));
    }
  };

  const onDragEnd = (e) => {
    e.target.style.display = "block";
  };

  return (
    <div
      className={`piece ${piece} p-${file}${rank}`}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {" "}
    </div>
  );
}

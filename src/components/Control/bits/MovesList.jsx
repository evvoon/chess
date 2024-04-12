import { useEffect } from "react";
import { useAppContext } from "../../../contexts/Context";
import "./MovesList.css";

export default function MovesList() {
  const {
    appState: { movesList },
  } = useAppContext();

  // useEffect(() => {
  //   console.log(movesList);
  // }, [movesList]);

  return (
    <div className="moves-list">
      {movesList.map((move, i) => (
        <div key={i} data-number={Math.floor(i / 2) + 1}>
          {move}
        </div>
      ))}
    </div>
  );
}

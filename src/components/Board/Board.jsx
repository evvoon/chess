import { getCharacter } from "../../helper";
import Pieces from "../Pieces/Pieces";
import Files from "../bits/Files";
import Ranks from "../bits/Ranks";
import "./Board.css";

export default function Board() {
  const getClassName = (i, j) => {
    let c = "";
    c += (i + j) % 2 === 0 ? "tile--dark" : "tile--light";
    return c;
  };

  const ranks = Array(8)
    .fill()
    .map((x, i) => 8 - i);

  const files = Array(8)
    .fill()
    .map((x, i) => i + 1);

  return (
    <div className="board">
      <Ranks ranks={ranks} />
      <div className="tiles">
        {ranks.map((rank, i) =>
          files.map((file, j) => (
            <div
              key={file + "-" + rank}
              className={getClassName(9 - i, j)}
            ></div>
          ))
        )}
      </div>

      <Pieces />

      <Files files={files} />
    </div>
  );
}

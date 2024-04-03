import "./Pieces.css";
import Piece from "./Piece";
import { useState, useRef } from "react";
import { copyPosition, createPosition } from "../../helper";

export default function Pieces() {
  const ref = useRef(); // to get the posn of the DOM elements

  const [state, setState] = useState(createPosition());

  function calculateCoords(e) {
    const { width, left, top } = ref.current.getBoundingClientRect(); // width since size of screen can vary
    const size = width / 8;
    const y = Math.floor((e.clientX - left) / size);
    const x = 7 - Math.floor((e.clientY - top) / size);
    return { x, y };
  }

  const onDrop = (e) => {
    const newPosition = copyPosition(state);
    const { x, y } = calculateCoords(e);

    const [p, rankString, fileString] = e.dataTransfer
      .getData("text")
      .split(",");
    const rank = parseInt(rankString, 10); // Convert rank to an integer
    const file = parseInt(fileString, 10); // Convert file to an integer

    console.log(newPosition[rank][file]);

    newPosition[rank][file] = "";
    newPosition[x][y] = p;

    setState(newPosition);
  };

  const onDragOver = (e) => e.preventDefault();

  return (
    <div ref={ref} onDrop={onDrop} onDragOver={onDragOver} className="pieces">
      {state.map((r, rank) =>
        r.map((f, file) =>
          state[rank][file] ? (
            <Piece
              key={rank + "-" + file}
              rank={rank}
              file={file}
              piece={state[rank][file]}
            />
          ) : null
        )
      )}
    </div>
  );
}

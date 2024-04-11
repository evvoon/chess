import "./Pieces.css";
import Piece from "./Piece";
import { useState, useRef, useEffect } from "react";
import { copyPosition, createPosition } from "../../helper";
import { useAppContext } from "../../contexts/Context";
import { clearCandidates, makeNewMove } from "../../reducer/actions/move";
import React from "react";

export default function Pieces() {
  const ref = useRef(); // to get the posn of the DOM elements

  const { appState, dispatch } = useAppContext();
  // const [state, setState] = useState(createPosition());

  // useEffect(() => console.log(appState), [appState]);

  const currentPosition = appState.position[appState.position.length - 1];

  function calculateCoords(e) {
    const { width, left, top } = ref.current.getBoundingClientRect(); // width since size of screen can vary

    const size = width / 8;

    const y = Math.floor((e.clientX - left) / size);
    const x = 7 - Math.floor((e.clientY - top) / size);
    return { x, y };
  }

  const onDrop = (e) => {
    // console.log("am i here");

    const { x, y } = calculateCoords(e);

    const [p, rank, file] = e.dataTransfer.getData("text").split(",");

    const newPosition = copyPosition(currentPosition);

    if (appState.candidateMoves?.find((m) => m[0] === x && m[1] === y)) {
      newPosition[Number(rank)][Number(file)] = "";
      newPosition[x][y] = p;

      dispatch(makeNewMove({ newPosition }));
    }

    dispatch(clearCandidates());
    // console.log({ newPosition });
    // setState(newPosition);
  };

  const onDragOver = (e) => e.preventDefault();
  // console.log(currentPosition);

  return (
    <div ref={ref} onDrop={onDrop} onDragOver={onDragOver} className="pieces">
      {currentPosition.map((r, rank) =>
        r.map((f, file) =>
          currentPosition[rank][file] ? (
            <Piece
              key={rank + "-" + file}
              rank={rank}
              file={file}
              piece={currentPosition[rank][file]}
            />
          ) : null
        )
      )}
    </div>
  );
}

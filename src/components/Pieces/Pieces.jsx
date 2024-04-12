import "./Pieces.css";
import Piece from "./Piece";
import { useState, useRef, useEffect } from "react";
import { copyPosition, createPosition } from "../../helper";
import { useAppContext } from "../../contexts/Context";
import { clearCandidates, makeNewMove } from "../../reducer/actions/move";
import React from "react";
import arbiter from "../../arbiter/arbiter";

export default function Pieces() {
  const ref = useRef(); // to get the posn of the DOM elements

  const { appState, dispatch } = useAppContext();
  // const [state, setState] = useState(createPosition());

  // useEffect(() => console.log(appState), [appState]);

  const currentPosition = appState.position[appState.position.length - 1];

  function calculateCoords(e) {
    const { top, left, width } = ref.current.getBoundingClientRect(); // width since size of screen can vary

    const size = width / 8;

    const y = Math.floor((e.clientX - left) / size);
    const x = 7 - Math.floor((e.clientY - top) / size);
    return { x, y };
  }

  const move = (e) => {
    const { x, y } = calculateCoords(e);

    const [piece, rank, file] = e.dataTransfer
      .getData("text")
      .split(",")
      .map((value) => value.trim()); // trim removes the front n back spaces

    if (appState.candidateMoves.find((m) => m[0] === x && m[1] === y)) {
      const newPosition = arbiter.performMove({
        position: currentPosition,
        piece,
        rank,
        file,
        x,
        y,
      });
      dispatch(makeNewMove({ newPosition }));
    }

    dispatch(clearCandidates());
  };

  const onDrop = (e) => {
    e.preventDefault();

    move(e);
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

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
    const { top, left, width } = ref.current.getBoundingClientRect(); // width since size of screen can vary

    const size = width / 8;

    const y = Math.floor((e.clientX - left) / size);
    const x = 7 - Math.floor((e.clientY - top) / size);
    return { x, y };
  }

  const onDrop = (e) => {
    e.preventDefault();

    const newPosition = copyPosition(currentPosition);

    const { x, y } = calculateCoords(e);

    let [p, rankStr, fileStr] = e.dataTransfer.getData("text").split(",");
    const rank = Number(rankStr.trim());
    const file = Number(fileStr.trim());

    if (
      rank >= 0 &&
      rank < 8 &&
      file >= 0 &&
      file < 8 &&
      x >= 0 &&
      x < 8 &&
      y >= 0 &&
      y < 8
    ) {
      if (appState.candidateMoves.find((m) => m[0] === x && m[1] === y)) {
        if (p.endsWith("p") && !newPosition[x][y] && x !== rank && y !== file) {
          newPosition[rank][y] = "";
        }

        newPosition[rank][file] = "";
        newPosition[x][y] = p;

        dispatch(makeNewMove({ newPosition }));
      }
    } else {
      console.error("Out of bounds", { x, y, rank, file });
    }

    dispatch(clearCandidates());
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

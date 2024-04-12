import "./Pieces.css";
import Piece from "./Piece";
import { useState, useRef, useEffect } from "react";
import { copyPosition, createPosition } from "../../helper";
import { useAppContext } from "../../contexts/Context";
import { clearCandidates, makeNewMove } from "../../reducer/actions/move";
import React from "react";
import arbiter from "../../arbiter/arbiter";
import openPromotion from "../../reducer/actions/popup";
import { getCastleDirections } from "../../arbiter/getMoves";
import {
  detectStalemate,
  updateCastling,
  detectInsufficientMaterial,
} from "../../reducer/actions/game";

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

  const openPromotionBox = ({ rank, file, x, y }) =>
    dispatch(
      openPromotion({
        rank: Number(rank),
        file: Number(file),
        x,
        y,
      })
    );

  const updateCastlingState = ({ piece, rank, file }) => {
    const direction = getCastleDirections({
      castleDirection: appState.castleDirection,
      piece,
      rank,
      file,
    });
    if (direction) {
      dispatch(updateCastling(direction));
    }
  };

  const move = (e) => {
    const { x, y } = calculateCoords(e);

    const [piece, rank, file] = e.dataTransfer
      .getData("text")
      .split(",")
      .map((value) => value.trim()); // trim removes the front n back spaces

    if (appState.candidateMoves.find((m) => m[0] === x && m[1] === y)) {
      const opponent = piece.startsWith("b") ? "w" : "b";
      const castleDirection =
        appState.castleDirection[
          `${piece.startsWith("b") ? "white" : "black"}`
        ];

      if ((piece === "wp" && x === 7) || (piece === "bp" && x === 0)) {
        openPromotionBox({ rank, file, x, y });

        return;
      }
      if (piece.endsWith("r") || piece.endsWith("k")) {
        updateCastlingState({ piece, rank, file });
      }
      const newPosition = arbiter.performMove({
        position: currentPosition,
        piece,
        rank,
        file,
        x,
        y,
      });
      dispatch(makeNewMove({ newPosition }));

      if (arbiter.isStalemate(newPosition, opponent, castleDirection)) {
        dispatch(detectStalemate());
      } else if (arbiter.insufficientMaterial(newPosition)) {
        dispatch(detectInsufficientMaterial());
      }
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

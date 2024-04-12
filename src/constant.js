import { createPosition } from "./helper";

export const Status = {
  ongoing: "Ongoing",
  promoting: "Promoting",
  white: "White wins",
  black: "Black wins",
};

export const initGame = {
  position: [createPosition()],
  turn: "w",
  candidateMoves: [],
  status: Status.ongoing,
  promotionSquare: null,
};

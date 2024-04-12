import { initGame } from "../../constant";
import actionTypes from "./actionTypes";

export function updateCastling(direction) {
  return {
    type: actionTypes.CAN_CASTLE,
    payload: direction,
  };
}

export function detectStalemate() {
  return {
    type: actionTypes.STALEMATE,
  };
}

export function setupNewGame() {
  return {
    type: actionTypes.NEW_GAME,
    payload: initGame,
  };
}

import actionTypes from "./actionTypes";

export function updateCastling(direction) {
  return {
    type: actionTypes.CAN_CASTLE,
    payload: direction,
  };
}

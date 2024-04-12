import actionTypes from "./actionTypes";

export default function openPromotion({ rank, file, x, y }) {
  return {
    type: actionTypes.PROMOTION_OPEN,
    payload: { rank, file, x, y },
  };
}

export function closePopup() {
  return {
    type: actionTypes.PROMOTION_CLOSE,
  };
}

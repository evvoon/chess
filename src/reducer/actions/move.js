export const makeNewMove = ({ newPosition }) => {
  return {
    type: "NEW_MOVE",
    payload: { newPosition },
  };
};

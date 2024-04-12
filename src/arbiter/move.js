import { copyPosition } from "../helper";

export const movePiece = ({ position, piece, rank, file, x, y }) => {
  const newPosition = copyPosition(position);
  console.log({ rank, file });
  newPosition[rank][file] = "";
  newPosition[x][y] = piece;
  return newPosition;
};

export const movePawn = ({ position, piece, rank, file, x, y }) => {
  const newPosition = copyPosition(position);

  rank = parseInt(rank, 10); // Ensure rank is an integer
  y = parseInt(y, 10); // Ensure y is an integer

  // Ensure rank and y are within bounds
  if (
    rank >= 0 &&
    rank < newPosition.length &&
    newPosition[rank] &&
    y >= 0 &&
    y < newPosition[rank].length
  ) {
    if (!newPosition[x][y] && x !== rank && y !== file) {
      newPosition[rank][y] = "";
    }
  } else {
    console.error(
      "Attempting to access out of bounds index or undefined array",
      { rank, y }
    );
  }

  newPosition[rank][file] = "";
  newPosition[x][y] = piece;
  return newPosition;
};

import { copyPosition } from "../helper";

export const movePiece = ({ position, piece, rank, file, x, y }) => {
  const newPosition = copyPosition(position);

  if (piece.endsWith("k") && Math.abs(y - file) > 1) {
    if (y === 2) {
      newPosition[rank][0] = "";
      newPosition[rank][3] = piece.startsWith("w") ? "wr" : "br";
    }
    if (y === 6) {
      newPosition[rank][7] = "";
      newPosition[rank][5] = piece.startsWith("w") ? "wr" : "br";
    }
  }

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

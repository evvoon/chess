export function getRookMoves({ position, piece, rank, file }) {
  const moves = [];
  const us = piece[0]; // which color pieces is ours
  const enemy = us === "w" ? "b" : "w";

  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  direction.forEach((dir) => {
    for (let i = 1; i < 8; i++) {
      const x = rank + i * dir[0];
      const y = file + i * dir[1];
      if (position?.[x]?.[y] === undefined) {
        break;
      }
      if (position[x][y].startsWith(enemy)) {
        moves.push([x, y]);
        break;
      }
      if (position[x][y].startsWith(us)) {
        break;
      }
      moves.push([x, y]);
    }
  });
  return moves;
}

export function getKnightMoves({ position, rank, file }) {
  const moves = [];
  const enemy = position[rank][file].startsWith("w") ? "b" : "w";

  const direction = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [2, -1],
    [2, 1],
  ];
  direction.forEach((c) => {
    const cell = position?.[rank + c[0]]?.[file + c[1]];
    if (cell !== undefined && (cell.startsWith(enemy) || cell === "")) {
      moves.push([rank + c[0], file + c[1]]);
    }
  });
  return moves;
}

export function getBishopMoves({ position, piece, rank, file }) {
  const moves = [];
  const us = piece[0]; // which color pieces is ours
  const enemy = us === "w" ? "b" : "w";

  const direction = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  direction.forEach((dir) => {
    for (let i = 1; i < 8; i++) {
      const x = rank + i * dir[0];
      const y = file + i * dir[1];
      if (position?.[x]?.[y] === undefined) {
        break;
      }
      if (position[x][y].startsWith(enemy)) {
        moves.push([x, y]);
        break;
      }
      if (position[x][y].startsWith(us)) {
        break;
      }
      moves.push([x, y]);
    }
  });
  return moves;
}

export function getQueenMoves({ position, piece, rank, file }) {
  const moves = [
    ...getRookMoves({ position, piece, rank, file }),
    ...getBishopMoves({ position, piece, rank, file }),
  ]; // queen moves is combination of rook and bishop

  return moves;
}

export function getKingMoves({ position, piece, rank, file }) {
  const moves = [];
  const us = piece[0]; // which color pieces is ours

  const direction = [
    [1, -1],
    [1, 0],
    [1, 1],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  direction.forEach((dir) => {
    const x = rank + dir[0];
    const y = file + dir[1];
    if (position?.[x]?.[y] !== undefined && !position[x][y].startsWith(us)) {
      moves.push([x, y]);
    }
  });
  return moves;
}

export function getPawnMoves({ position, piece, rank, file }) {
  const moves = [];
  const dir = piece === "wp" ? 1 : -1;

  if (!position?.[rank + dir][file]) {
    // if next spot is available and its empty
    moves.push([rank + dir, file]);
  }

  if (rank % 5 === 1) {
    if (
      position?.[rank + dir]?.[file] === "" &&
      position?.[rank + dir + dir]?.[file] === ""
    ) {
      moves.push([rank + dir + dir, file]);
    }
  }

  return moves;
}

export function getPawnCaptures({ position, piece, rank, file }) {
  const moves = [];
  const dir = piece === "wp" ? 1 : -1;
  const enemy = piece[0] === "w" ? "b" : "w";

  if (
    position?.[rank + dir]?.[file - 1] &&
    position?.[rank + dir]?.[file - 1].startsWith(enemy)
  ) {
    moves.push([rank + dir, file - 1]);
  }
  if (
    position?.[rank + dir]?.[file + 1] &&
    position?.[rank + dir]?.[file + 1].startsWith(enemy)
  ) {
    moves.push([rank + dir, file + 1]);
  }

  return moves;
}

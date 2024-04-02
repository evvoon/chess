import "./Pieces.css";

export default function Pieces() {
  const position = new Array(8).fill().map((x) => new Array(8).fill(""));

  position[0][0] = "wr";
  position[7][7] = "br";

  return (
    <div className="pieces">
      {position.map((r, rank) =>
        r.map((f, file) => (position[rank][file] ? position[rank][file] : null))
      )}
    </div>
  );
}

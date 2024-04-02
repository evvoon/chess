import "./Ranks.css";

export default function Ranks({ ranks }) {
  return (
    <div className="ranks">
      {ranks.map((rank) => (
        <span key={rank}>{rank}</span>
      ))}
    </div>
  );
}

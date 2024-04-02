import "./Files.css";
import { getCharacter } from "../../helper";

export default function Files({ files }) {
  return (
    <div className="files">
      {files.map((file) => (
        <span key={file}>{getCharacter(file)}</span>
      ))}
    </div>
  );
}

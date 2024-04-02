import "./Files.css";

export default function Files({ files }) {
  return (
    <div className="files">
      {files.map((file) => (
        <span key={file}>{file}</span>
      ))}
    </div>
  );
}

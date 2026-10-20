export default function ProgressBar({ progress }) {
  return <div className="progress" style={{ width: `${progress}%` }} aria-hidden="true" />;
}

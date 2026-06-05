import "./loading.css";

export default function Loading() {
  return (
    <div className="circle-loading" aria-label="Loading" role="status">
      <div className="circle-spinn"></div>
    </div>
  );
}

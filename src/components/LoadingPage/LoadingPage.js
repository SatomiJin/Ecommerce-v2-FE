import "./LoadingPage.scss";

function LoadingPage() {
  return (
    <>
      <div className="spinner-border-container">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-border-text mx-3 title text-light">Đang tải...</div>
      </div>
    </>
  );
}

export default LoadingPage;

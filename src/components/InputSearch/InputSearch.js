import "./InputSearch.scss";
function InputSearch() {
  return (
    <div className="input-search-container">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập sản phẩm cần tìm..."
          aria-label="Nhập sản phẩm cần tìm..."
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button className="btn btn-out-light" type="button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputSearch;

import ReactPaginate from "react-paginate";
import "./Paginate.scss";

function Paginate(props) {
  let { products, itemsPerPage, handlePageChange } = props;
  return (
    <div className="paginate-container">
      <ReactPaginate
        className="paginate-content"
        previousLabel={
          <button className="btn btn-lg btn-paginate">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        }
        nextLabel={
          <button className="btn btn-lg btn-paginate">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        }
        breakLabel={"..."}
        pageCount={Math.ceil(products?.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Paginate;

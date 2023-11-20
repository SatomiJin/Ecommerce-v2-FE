function DeleteModal(props) {
  const handleDelete = () => {
    props.handleDeleteUser();
    props.handleDeleted(false);
  };
  return (
    <div className="modal fade" id="deleteUser" tabIndex="-1" aria-labelledby="deleteUser" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{ backgroundColor: "#8EC5FC", backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)" }}
          >
            <h5 className="modal-title" id="exampleModalLabel">
              Xóa người dùng
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-center" style={{ fontSize: "1.3rem" }}>
            Bạn có muốn xóa người dùng với email là : <div style={{ fontWeight: "bold" }}>{props.deleteUserEmail}</div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Hủy
            </button>
            <button
              type="button"
              data-bs-dismiss={props.isDelete === true ? "modal" : ""}
              onClick={() => handleDelete()}
              className="btn btn-outline-danger"
            >
              Xóa người dùng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;

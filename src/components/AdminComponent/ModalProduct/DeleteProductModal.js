import { toast } from "react-toastify";
import * as ProductService from "../../../service/ProductService";

function DeleteProductModal(props) {
  let { productName, user } = props;
  const handleDeleteProduct = async () => {
    let res = await ProductService.deleteProduct(productName, user.access_token);
    if (res && res.status === "OK") {
      toast.success("Xóa sản phẩm thành công!!");
      props.handleDeleteProduct(true);
    } else {
      toast.error("Xóa sản phẩm thất bại!!");
    }
  };
  return (
    <div className="delete-product-modal">
      <div className="modal fade" id="deleteProduct" tabIndex="-1" aria-labelledby="deleteProduct" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{
                backgroundColor: "#8EC5FC",
                backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
              }}
            >
              <h5 className="modal-title" id="exampleModalLabel">
                Xóa sản phẩm
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                bạn có muốn xóa sản phẩm: <span>{productName}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
              <button
                type="button"
                onClick={handleDeleteProduct}
                data-bs-dismiss="modal"
                className="btn btn-outline-danger"
              >
                Xóa sản phẩm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;

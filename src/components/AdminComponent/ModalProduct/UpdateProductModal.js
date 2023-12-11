import { useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import * as utils from "../../../utils";
import * as ProductService from "../../../service/ProductService";

function UpdateProductModal(props) {
  let { dataUpdate, user } = props;

  let [productDetail, setProductDetail] = useState({
    name: "",
    type: "",
    image: "",
    price: "",
    rating: 0,
    description: "",
    discount: "",
    sold: 0,
    countInStock: "",
    //----
    newType: "",
  });
  const handleOnChange = (e) => {
    let copyState = { ...productDetail };
    copyState[e.target.name] = e.target.value;
    setProductDetail({ ...copyState });
  };
  const handleOnchangeImage = async (e) => {
    const data = e.target.files;
    const file = data[0];
    if (file) {
      const base64 = await utils.getBase64(file);
      setProductDetail({
        ...productDetail,
        image: base64,
      });
    }
  };
  const getAllTypeProduct = async () => {
    let res = await ProductService.getAllTypeProduct();
    return res.data;
  };
  const handleOnchangeSelect = (value) => {
    setProductDetail({
      ...productDetail,
      type: value,
    });
  };
  const typeProducts = useQuery({ queryKey: ["type_product"], queryFn: getAllTypeProduct });
  const handleUpdateProduct = async () => {
    let data = {
      name: productDetail.name,
      type: productDetail?.type.value === "ADD_TYPE" ? productDetail.newType : productDetail.type.value,
      image: productDetail.image,
      price: productDetail.price,
      rating: 0,
      description: productDetail.description,
      discount: productDetail.discount,
      sold: 0,
      countInStock: productDetail.countInStock,
    };
    let res = await ProductService.updateProduct(data, user.access_token);
    if (res && res.status === "OK") {
      toast.success("Cập nhật sản phẩm thành công!!");
      props.handleUpdateProduct(true);
    } else {
      toast.error("Cập nhật sản phẩm thất bại!!");
    }
  };

  //useEffect
  useEffect(() => {
    if (dataUpdate) {
      let value = {
        label: dataUpdate.type ? dataUpdate.type : "",
        value: dataUpdate.type ? dataUpdate.type : "",
      };
      setProductDetail({
        name: dataUpdate.name,
        type: value,
        image: dataUpdate.image,
        price: dataUpdate.price,
        rating: dataUpdate.rating,
        description: dataUpdate.description,
        discount: dataUpdate.discount,
        sold: dataUpdate.sold,
        countInStock: dataUpdate.countInStock,
        //----
        newType: "",
      });
    }
  }, [dataUpdate]);
  return (
    <div className="update-product-modal">
      <div
        className="modal modal-lg fade"
        id="updateProduct"
        tabIndex="-1"
        aria-labelledby="updateProduct"
        aria-hidden="true"
      >
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
                Cập nhật sản phẩm
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body row">
              <div className="form-group col-12">
                <label htmlFor="name">Tên sản phẩm:</label>
                <input
                  type="text"
                  placeholder="Nhập tên sản phẩm..."
                  id="name"
                  disabled
                  style={{ cursor: "not-allowed" }}
                  value={productDetail.name || ""}
                  onChange={(e) => handleOnChange(e)}
                  className="form-control"
                  name="name"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="type">Loại sản phẩm:</label>
                <Select
                  name="type"
                  className="select-control"
                  value={productDetail.type ? productDetail.type : ""}
                  onChange={handleOnchangeSelect}
                  options={utils.renderAllType((typeProducts && typeProducts.data) || [])}
                />
                {productDetail.type.value === "ADD_TYPE" && (
                  <input
                    type="text"
                    className="form-control"
                    name="newType"
                    placeholder="Nhập loại sản phẩm.."
                    value={productDetail.newType || ""}
                    onChange={(e) => handleOnChange(e)}
                  />
                )}
              </div>

              <div className="form-group col-6">
                <label htmlFor="price">Giá tiền:</label>
                <input
                  type="text"
                  id="price"
                  placeholder="Nhập giá sản phẩm..."
                  value={productDetail.price || ""}
                  onChange={(e) => handleOnChange(e)}
                  className="form-control"
                  name="price"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="description">Mô tả sản phẩm:</label>
                <input
                  type="text"
                  id="description"
                  placeholder="Mô tả sản phẩm..."
                  value={productDetail.description || ""}
                  onChange={(e) => handleOnChange(e)}
                  className="form-control"
                  name="description"
                />
              </div>

              <div className="form-group col-4">
                <label htmlFor="discount">Giảm giá:</label>
                <input
                  type="text"
                  id="discount"
                  placeholder="Giảm giá..."
                  value={productDetail.discount || ""}
                  onChange={(e) => handleOnChange(e)}
                  className="form-control"
                  name="discount"
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor="countInStock">Số lượng trong kho:</label>
                <input
                  type="text"
                  id="countInStock"
                  placeholder="Số lượng trong kho..."
                  value={productDetail.countInStock || ""}
                  onChange={(e) => handleOnChange(e)}
                  className="form-control"
                  name="countInStock"
                />
              </div>
              <div className="form-group col-4">
                <button
                  className="btn btn-outline-success"
                  type="button"
                  style={{ padding: "0.5rem", marginTop: "1.6rem" }}
                >
                  <label htmlFor="imageProduct" style={{ cursor: "pointer" }}>
                    Đổi ảnh
                  </label>
                </button>
                <input type="file" id="imageProduct" hidden onChange={(e) => handleOnchangeImage(e)} name="image" />
                {productDetail.image && (
                  <div
                    className="preview-product-image"
                    style={{
                      position: "absolute",
                      right: "10%",
                      bottom: "2%",
                      borderRadius: "50%",
                      backgroundImage: `url(${productDetail.image})`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      width: "4rem",
                      height: "4rem",
                    }}
                  ></div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
              <button
                type="button"
                onClick={handleUpdateProduct}
                data-bs-dismiss="modal"
                className="btn btn-outline-success"
              >
                Cập nhật sản phẩm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProductModal;

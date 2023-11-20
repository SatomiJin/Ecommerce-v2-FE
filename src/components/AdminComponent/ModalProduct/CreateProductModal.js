import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

import * as utils from "../../../utils";
import * as ProductService from "../../../service/ProductService";
function CreateProductModal(props) {
  let user = useSelector((state) => state.user);

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

  const handleCreateProduct = async (e) => {
    e.preventDefault();
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

    let res = await ProductService.createNewProduct(data, user && user.access_token);
    if (res && res.status === "OK") {
      props.handleCreateProduct(true);
      setProductDetail({
        name: "",
        type: "",
        image: "",
        price: "",
        rating: 0,
        description: "",
        discount: "",
        sold: 0,
        countInStock: "",
      });
      toast.success("Tạo sản phẩm thành công!!!");
    } else {
      toast.error("Tạo sản phảm thất bại !!!");
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
  // const handleBuildInputSelect = (data) => {
  //   let result = [];
  //   if (data) {
  //     data.map((item) => {
  //       let obj = {};
  //       obj.label = item.label;
  //       obj.value = item.value;
  //       result.push(obj);
  //     });
  //   }
  //   return result;
  // };

  //useEffect
  // useEffect(() => {
  //   if (typeProducts) {
  //     setProductDetail({
  //       ...productDetail,
  //       type: handleBuildInputSelect(utils.renderAllType(productDetail.type)),
  //     });
  //   }
  // }, [typeProducts.data]);
  return (
    <div className="admin-product-create-modal">
      <div
        className="modal modal-lg fade"
        id="createProduct"
        tabIndex="-1"
        aria-labelledby="createProduct"
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
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Tạo sản phẩm
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={(e) => handleCreateProduct(e)}>
              <div className="modal-body row">
                <div className="form-group col-12">
                  <label htmlFor="name">Tên sản phẩm:</label>
                  <input
                    required
                    type="text"
                    placeholder="Nhập tên sản phẩm..."
                    id="name"
                    value={productDetail.name}
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
                    value={productDetail.type}
                    onChange={handleOnchangeSelect}
                    options={utils.renderAllType(typeProducts && typeProducts.data)}
                  />

                  {productDetail.type.value === "ADD_TYPE" && (
                    <input
                      type="text"
                      className="form-control"
                      name="newType"
                      placeholder="Nhập loại sản phẩm.."
                      value={productDetail.newType}
                      onChange={(e) => handleOnChange(e)}
                    />
                  )}
                </div>
                <div className="form-group col-6">
                  <label htmlFor="price">Giá tiền:</label>
                  <input
                    required
                    type="text"
                    id="price"
                    placeholder="Nhập giá sản phẩm..."
                    value={productDetail.price}
                    onChange={(e) => handleOnChange(e)}
                    className="form-control"
                    name="price"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="description">Mô tả sản phẩm:</label>
                  <input
                    required
                    type="text"
                    id="description"
                    placeholder="Mô tả sản phẩm..."
                    value={productDetail.description}
                    onChange={(e) => handleOnChange(e)}
                    className="form-control"
                    name="description"
                  />
                </div>

                <div className="form-group col-4">
                  <label htmlFor="discount">Giảm giá:</label>
                  <input
                    required
                    type="text"
                    id="discount"
                    placeholder="Giảm giá..."
                    value={productDetail.discount}
                    onChange={(e) => handleOnChange(e)}
                    className="form-control"
                    name="discount"
                  />
                </div>
                <div className="form-group col-4">
                  <label htmlFor="countInStock">Số lượng trong kho:</label>
                  <input
                    required
                    type="text"
                    id="countInStock"
                    placeholder="Số lượng trong kho..."
                    value={productDetail.countInStock}
                    onChange={(e) => handleOnChange(e)}
                    className="form-control"
                    name="countInStock"
                  />
                </div>
                <div className="form-group col-4">
                  <input required type="file" id="image" hidden onChange={(e) => handleOnchangeImage(e)} name="image" />
                  <button
                    className="btn btn-outline-success"
                    type="button"
                    style={{ padding: "0.5rem", marginTop: "1.6rem" }}
                  >
                    <label htmlFor="image" style={{ cursor: "pointer" }}>
                      Thêm ảnh
                    </label>
                  </button>

                  {productDetail && productDetail.image && (
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
                <button type="submit" className="btn btn-outline-success" data-bs-dismiss="modal">
                  Tạo sản phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProductModal;

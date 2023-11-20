import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { useSelector } from "react-redux";

import * as ProductService from "../../service/ProductService";
import CreateProductModal from "./ModalProduct/CreateProductModal";
import Loading from "../../components/Loading/Loading";
import "./AdminProduct.scss";
import DeleteProductModal from "./ModalProduct/DeleteProductModal";
import UpdateProductModal from "./ModalProduct/UpdateProductModal";
function AdminProduct() {
  let user = useSelector((state) => state.user);
  let [isCreateProduct, setIsCreateProduct] = useState(false);
  let [isDeleteProduct, setIsDeleteProduct] = useState(false);
  let [isUpdateProduct, setIsUpdateProduct] = useState(false);

  let [dataUpdate, setDataUpdate] = useState({});
  let [productName, setProductName] = useState("");
  let [dataGetProduct, setDataGetProduct] = useState({
    search: "",
    limit: 5,
    page: 0,
    allPage: 1,
  });
  const getAllProduct = async () => {
    let res = await ProductService.getAllProduct(dataGetProduct);
    setDataGetProduct({
      ...dataGetProduct,
      allPage: res.allPage,
    });
    return res;
  };
  const queryProduct = useQuery({ queryKey: ["products"], queryFn: getAllProduct });
  const { data: products, isLoading } = queryProduct;

  const handleOnChange = (current, pageSize) => {
    setDataGetProduct({ ...dataGetProduct, page: current - 1, limit: pageSize });
  };
  const handleCreateProduct = (status) => {
    setIsCreateProduct(status);
  };
  const handleDeleteProduct = (status) => {
    setIsDeleteProduct(status);
  };
  const handleUpdateProduct = (status) => {
    setIsUpdateProduct(status);
  };
  //useEffect
  useEffect(() => {
    queryProduct.refetch();
  }, [dataGetProduct.limit, dataGetProduct.page]);
  useEffect(() => {
    if (isCreateProduct === true) {
      queryProduct.refetch();
      setIsCreateProduct(false);
    }
    if (isDeleteProduct === true) {
      queryProduct.refetch();
      setIsDeleteProduct(false);
    }

    if (isUpdateProduct === true) {
      queryProduct.refetch();
      setIsUpdateProduct(false);
    }
  }, [isCreateProduct, isDeleteProduct, isUpdateProduct]);
  return (
    <>
      <div className="admin-product-container p-3">
        <div className="admin-product-title text-uppercase text-center">Quản lý sản phẩm</div>
        <div className="admin-product-btn">
          <button className="btn" data-bs-toggle="modal" data-bs-target="#createProduct">
            <i className="fa-solid fa-circle-plus"></i> Thêm sản phẩm
          </button>
        </div>
        <Loading isLoading={isLoading}>
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Loại sản phẩm</th>
                <th scope="col">Giá tiền</th>
                <th scope="col">Số lượng còn lại</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {products &&
                products.data &&
                products.data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.price}</td>
                      <td>{item.countInStock}</td>
                      <td>
                        <div className="admin-product-table-btn">
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteProduct"
                            onClick={() => setProductName(item.name)}
                            className="btn btn-outline-danger"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#updateProduct"
                            onClick={() => setDataUpdate(item)}
                            className="btn btn-info"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Loading>
        <div className="admin-product-pagination text-center">
          <Pagination
            defaultCurrent={dataGetProduct.page + 1}
            onChange={handleOnChange}
            total={+dataGetProduct.allPage * 5}
            pageSize={5}
          />
        </div>
      </div>
      <div className="admin-product-modal">
        <CreateProductModal handleCreateProduct={handleCreateProduct} />
        <DeleteProductModal productName={productName} user={user} handleDeleteProduct={handleDeleteProduct} />
        <UpdateProductModal handleUpdateProduct={handleUpdateProduct} user={user} dataUpdate={dataUpdate} />
      </div>
    </>
  );
}

export default AdminProduct;

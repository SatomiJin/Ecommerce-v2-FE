import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { searchProduct } from "../../redux/slides/ProductReducer";

import "./InputSearch.scss";
import * as ProductService from "../../service/ProductService";
import { useDebounce } from "../../hooks/useDebounce";
function InputSearch() {
  let [search, setSearch] = useState("");
  let navigate = useNavigate();
  const searchProducts = useSelector((state) => state.product.search);
  const searchDebounce = useDebounce(searchProducts, 500);
  const dispatch = useDispatch();
  const fetchAllProducts = async (context) => {
    const limit = context && context.queryKey && context.queryKey[1];
    const search = context && context.queryKey && context.queryKey[2];
    const res = await ProductService.getAllProduct({ search, limit });

    return res;
  };
  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["product", 6, searchDebounce], fetchAllProducts, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };
  const handleRedirect = (item) => {
    navigate(`/product/product-detail/${item.name.toLowerCase().replace(/\s/g, "-")}`, { state: item.name });
    setSearch("");
  };
  return (
    <div className="input-search-container">
      <div className="input-group">
        <input
          type="text"
          value={search}
          onChange={onSearch}
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
      {products && products.data && search && (
        <div className="search-content">
          {products.data.length > 0 ? (
            <ul>
              {products.data.map((item, index) => {
                return (
                  <li key={index} onClick={() => handleRedirect(item)}>
                    <div className="search-content-img" style={{ backgroundImage: `url(${item.image})` }}></div>
                    <div className="search-content-name">{item.name}</div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="search-content-not-found">Không có sản phẩm cần tìm...</div>
          )}
        </div>
      )}
    </div>
  );
}

export default InputSearch;

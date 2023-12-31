import { useEffect, useState } from "react";

import Loading from "../../components/Loading/Loading.js";
import NavBar from "../../components/NavBar/NavBar.js";
import Card from "../../components/Card/Card";
import * as ProductService from "../../service/ProductService";
import "./TypeProductPage.scss";
import { useLocation, useParams } from "react-router-dom";
import Paginate from "../../components/Paginate/Paginate.js";
function TypeProductPage() {
  const [typeProduct, setTypeProduct] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  let location = useLocation();
  let params = useParams();

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const fetchAllProducts = async () => {
    setIsLoading(true);
    if (location.state) {
      let res = await ProductService.getAllProductByType(location.state);
      if (res && res.status === "OK") {
        setProducts(res.data);
        setIsLoading(false);
      }
    } else {
      let originType = params.name;
      let typeProduct = originType.split("-").join(" ");
      let res = await ProductService.getAllProductByType(typeProduct);
      if (res && res.status === "OK") {
        setIsLoading(false);
        setProducts(res.data);
      }
    }

    // return res;
  };
  const getAllTypeProduct = async () => {
    let res = await ProductService.getAllTypeProduct();
    if (res && res.status === "OK") {
      setTypeProduct(res.data);
    }
  };

  //useEffect
  useEffect(() => {
    getAllTypeProduct();
    fetchAllProducts();
  }, []);
  useEffect(() => {
    fetchAllProducts();
  }, [params.name, location?.state]);
  return (
    <div className="type-product-container">
      <NavBar typeProduct={typeProduct} />
      <div className="title">Danh sách sản phẩm</div>
      <div className="type-product-body">
        <Loading isLoading={isLoading}>
          <div className="type-product-body-content just container">
            {products && products?.length > 0 && products.length < itemsPerPage
              ? products.map((item, index) => {
                  return (
                    <Card
                      key={index}
                      id={item.id}
                      countInStock={item.countInStock}
                      description={item.description}
                      image={item.image}
                      name={item.name}
                      price={item.price}
                      rating={item.rating}
                      type={item.type}
                      sold={item.sold}
                      discount={item.discount}
                    />
                  );
                })
              : products.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((item, index) => {
                  return (
                    <Card
                      key={index}
                      id={item.id}
                      countInStock={item.countInStock}
                      description={item.description}
                      image={item.image}
                      name={item.name}
                      price={item.price}
                      rating={item.rating}
                      type={item.type}
                      sold={item.sold}
                      discount={item.discount}
                    />
                  );
                })}
          </div>
        </Loading>
      </div>
      <div className="type-product-paginate">
        {console.log("product", products)}
        {products?.length > itemsPerPage && (
          <Paginate products={products} itemsPerPage={itemsPerPage} handlePageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
}

export default TypeProductPage;

import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";

import Loading from "../../components/Loading/Loading";
import NavBar from "../../components/NavBar/NavBar";
import Sliders from "../../components/Sliders/Sliders";
import * as ProductService from "../../service/ProductService";
import * as utils from "../../utils";
import { useQuery } from "@tanstack/react-query";
import "./HomePage.scss";
import LikeShareButton from "../../components/PluginSoccial/LikeShareButton";
function HomePage() {
  // const searchProduct = useSelector((state) => state.product.search);
  // const searchDebounce = useDebounce(searchProduct, 500);
  // const [Loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(8);
  const [typeProduct, setTypeProduct] = useState([]);
  const fetchAllProducts = async (context) => {
    // const limit = context && context.queryKey && context.queryKey[1];
    // const search = context && context.queryKey && context.queryKey[2];
    const res = await ProductService.getAllProduct({ limit });

    return res;
  };
  const getAllTypeProduct = async () => {
    let res = await ProductService.getAllTypeProduct();
    if (res && res.status === "OK") {
      setTypeProduct(res.data);
    }
  };
  const { isLoading, data: products } = useQuery(["product", limit], fetchAllProducts, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  //useEffect
  useEffect(() => {
    getAllTypeProduct();
    utils.initFacebookSDK();
  }, []);
  return (
    <div className="home-page-container">
      <NavBar typeProduct={typeProduct} />
      <div className="home-page-content container">
        <Sliders />
        <Loading isLoading={isLoading}>
          <div className="card-container container">
            {products &&
              products.data &&
              products.data.map((item, index) => {
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
          <div className="home-page-button-load-more text-center my-3">
            <button
              disabled={(products && products.total === products.data?.length) || (products && products.allPage === 1)}
              className="btn btn-lg"
              onClick={() => setLimit((prev) => prev + 6)}
            >
              Xem thêm
            </button>
          </div>
        </Loading>
      </div>
    </div>
  );
}

export default HomePage;

import { useSelector } from "react-redux";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import Card from "../../components/Card/Card";
import NavBar from "../../components/NavBar/NavBar";
import Sliders from "../../components/Sliders/Sliders";
import * as ProductService from "../../service/ProductService";
import { useQuery } from "@tanstack/react-query";
import "./HomePage.scss";
function HomePage() {
  const searchProduct = useSelector((state) => state.product.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [Loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);

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
  } = useQuery(["product"], fetchAllProducts, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  return (
    <div style={{ height: "100rem" }}>
      <NavBar />
      <div className="container">
        <Sliders />
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
      </div>
    </div>
  );
}

export default HomePage;

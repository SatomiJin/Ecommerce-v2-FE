import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import changeProduct from "../../assets/images/Free-ship/change-product.png";
import realProduct from "../../assets/images/Free-ship/real-product.png";
import freeShipRed from "../../assets/images/Free-ship/free-ship-red.png";
import * as ProductService from "../..//service/ProductService";
import freeShip from "../../assets/images/Free-ship/free-ship.png";
import "./ProductDetail.scss";
import { useQuery } from "@tanstack/react-query";

function ProductDetail(props) {
  let [amountProduct, setAmountProduct] = useState(1);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const getDetailProduct = async () => {
    if (props.productName) {
      const res = await ProductService.getDetailProduct(props.productName);
      return res.data;
    }
  };

  const handleOnchangeAmount = (e) => {
    setAmountProduct(e.target.value);
  };
  const renderStar = (rating) => {
    let stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(<i className="fa-solid fa-star" key={i}></i>);
    }
    return stars;
  };

  //useQuery
  const { data: ProductDetails } = useQuery(["product-details", props.productName], getDetailProduct, {
    enabled: !!props.productName,
  });

  //useEffect
  useEffect(() => {
    if (amountProduct === 0) setAmountProduct((prev) => prev + 1);
    if (amountProduct < 0) setAmountProduct(1);
  }, [amountProduct]);
  return (
    <div className="product-detail-container">
      <div className="product-detail-content row">
        <div className="product-detail-content-left text-center col-4">
          <div
            className="product-detail-content-left-img"
            style={{ backgroundImage: `url(${ProductDetails && ProductDetails.image})` }}
          ></div>
          <button type="button" className="btn btn-danger my-3">
            Xem chi tiết
          </button>
        </div>
        <div className="product-detail-content-right col-8">
          <div className="product-detail-content-right-name">{ProductDetails && ProductDetails.name}</div>
          <div className="product-detail-content-right-info row my-3">
            <div className="product-detail-content-right-rating-sold text-center col-4">4.2 {renderStar(5)}</div>
            <div className="product-detail-content-right-ratted col-4 text-center">
              15,5k <span style={{ color: "#ccc" }}>Đánh giá</span>
            </div>
            <div className="product-detail-content-right-sold col-4">
              67,4k <span style={{ color: "#ccc" }}>Đã bán</span>
            </div>
          </div>
          <div className="product-detail-content-right-price">
            <h2>{ProductDetails && ProductDetails.price}</h2>{" "}
            <span className="discount">{ProductDetails && ProductDetails.discount}% Giảm</span>
          </div>
          <div className="product-detail-content-right-delivery">
            <div className="title">Vận chuyển:</div>
            <div className="delivery">
              <div className="free-ship">
                <img src={freeShip} className="free-ship-img" alt="free-ship" />
                &nbsp;Miễn phí vận chuyển
                <div style={{ fontSize: "0.9rem", color: "rgba(0,0,0,.54)", marginLeft: "2rem" }}>
                  Miễn phí vận chuyển cho đơn hàng từ 1tr
                </div>
              </div>
              <div className="transfer-to my-2">
                <i className="fa-solid fa-truck" style={{ fontSize: "1.5rem" }}></i>
                &nbsp;Vận chuyển tới: {ProductDetails && ProductDetails.address}
                <div style={{ color: "rgba(0,0,0,.54)", marginLeft: "2rem" }}>Phí vận chuyển: từ 17.000 - 22.000</div>
              </div>
            </div>
          </div>
          <div className="product-detail-content-right-amount">
            Số lượng:
            <div className="amount-input">
              <button type="button" onClick={() => setAmountProduct((prev) => prev - 1)}>
                -
              </button>
              <input
                className="amount-input-number"
                onChange={(e) => handleOnchangeAmount(e)}
                value={amountProduct && amountProduct > 0 ? amountProduct : 1}
              />
              <button type="button" onClick={() => setAmountProduct((prev) => prev + 1)}>
                +
              </button>
            </div>
          </div>
          <div className="product-detail-content-right-buy">
            <button type="button" className="btn">
              Chọn mua
            </button>
          </div>
          <div className="product-detail-content-right-commit row text-center my-3">
            <div className="col-4">
              <img src={changeProduct} alt="change" /> 7 ngày miễn phí trả hàng
            </div>
            <div className="col-4">
              {" "}
              <img src={realProduct} alt="real" /> Hàng chính hãng 100%
            </div>
            <div className="col-4">
              {" "}
              <img src={freeShipRed} alt="freeShip" /> Miễn phí vẫn chuyển
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

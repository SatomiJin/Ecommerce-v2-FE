import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import changeProduct from "../../assets/images/Free-ship/change-product.png";
import realProduct from "../../assets/images/Free-ship/real-product.png";
import freeShipRed from "../../assets/images/Free-ship/free-ship-red.png";
import * as ProductService from "../..//service/ProductService";
import freeShip from "../../assets/images/Free-ship/free-ship.png";
import "./ProductDetail.scss";
import { useQuery } from "@tanstack/react-query";
import { addOrderProduct, resetOrder } from "../../redux/slides/OrderReducer";

function ProductDetail(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  let [amountProduct, setAmountProduct] = useState(1);
  let [errorListOrder, setErrorLimitOrder] = useState(false);

  const getDetailProduct = async () => {
    if (props.productName !== null) {
      const res = await ProductService.getDetailProduct(props.productName);
      return res.data;
    } else {
      const productNameReverse = location.pathname.split("/");
      const lastSegment = productNameReverse[productNameReverse.length - 1];
      const reverseName1 = lastSegment.replace(/-/g, " ");

      const res = await ProductService.getDetailProduct(reverseName1);
      return res.data;
    }
  };

  const handleOnchangeAmount = (e) => {
    setAmountProduct(e.target.value);
  };
  const handleOnchangeCount = (type, limit) => {
    if (type === "INCREASE") {
      if (!limit) {
        setAmountProduct(amountProduct + 1);
      }
    } else {
      if (!limit) {
        setAmountProduct(amountProduct - 1);
      }
    }
  };
  const renderStar = (rating) => {
    let stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(<i className="fa-solid fa-star" key={i}></i>);
    }
    return stars;
  };

  const handleAddOrderProduct = () => {
    if (!user.id) {
      navigate("/sign-in", { state: location.pathname });
    } else {
      const orderRedux = order?.orderItems?.find((item) => item?.name === productDetails?.name);
      if (
        orderRedux?.amount + amountProduct <= orderRedux?.countInStock ||
        (!orderRedux && productDetails?.countInStock > 0)
      ) {
        toast.success("Đã thêm hàng vào giỏ!!");
        dispatch(
          addOrderProduct({
            orderRedux: {
              name: productDetails?.name,
              amount: amountProduct,
              image: productDetails?.image,
              price: productDetails?.price,
              discount: productDetails?.discount,
              countInStock: productDetails?.countInStock,
            },
          })
        );
      } else {
        toast.error("Thêm sản phẩm thất bại!!");
        setErrorLimitOrder(true);
      }
    }
  };
  //useQuery
  let queryDetailProduct = useQuery(["product-details", props.productName], getDetailProduct, {
    enabled: !!props.productName,
  });
  const { data: productDetails } = queryDetailProduct;
  //useEffect
  useEffect(() => {
    const orderRedux = order?.orderItems?.find((item) => item?.name === productDetails?.name);
    if (
      orderRedux?.amount + amountProduct <= orderRedux?.countInStock ||
      (!orderRedux && productDetails?.countInStock > 0)
    ) {
      setErrorLimitOrder(false);
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true);
    }
  }, [amountProduct]);

  useEffect(() => {
    if (order.isSuccessOrder) {
      return () => {
        dispatch(resetOrder);
      };
    }
  }, [order.isSuccessOrder, errorListOrder]);

  useEffect(() => {
    if (user) {
      queryDetailProduct.refetch();
    }
  }, [user]);
  return (
    <div className="product-detail-container">
      <div className="product-detail-content row">
        <div className="product-detail-content-left text-center col-4">
          <div
            className="product-detail-content-left-img"
            style={{ backgroundImage: `url(${productDetails && productDetails.image})` }}
          ></div>
          <button type="button" className="btn btn-danger my-3">
            Xem chi tiết
          </button>
        </div>
        <div className="product-detail-content-right col-8">
          <div className="product-detail-content-right-name">{productDetails && productDetails.name}</div>
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
            <h2>{productDetails && productDetails.price}</h2>{" "}
            <span className="discount">{productDetails && productDetails.discount}% Giảm</span>
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
                &nbsp;Vận chuyển tới: {productDetails && productDetails.address}
                <div style={{ color: "rgba(0,0,0,.54)", marginLeft: "2rem" }}>Phí vận chuyển: từ 17.000 - 22.000</div>
              </div>
            </div>
          </div>
          <div className="product-detail-content-right-amount">
            Số lượng:
            <div className="amount-input">
              <button type="button" onClick={() => handleOnchangeCount("DECREASE", amountProduct === 1)}>
                -
              </button>
              <input className="amount-input-number" onChange={(e) => handleOnchangeAmount(e)} value={amountProduct} />
              <button
                type="button"
                onClick={() => handleOnchangeCount("INCREASE", amountProduct === productDetails?.countInStock)}
              >
                +
              </button>
            </div>
          </div>
          <div className="product-detail-content-right-buy">
            <button type="button" onClick={() => handleAddOrderProduct()} className="btn">
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

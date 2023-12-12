import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingPage from "../LoadingPage/LoadingPage";
import changeProduct from "../../assets/images/Free-ship/change-product.png";
import realProduct from "../../assets/images/Free-ship/real-product.png";
import freeShipRed from "../../assets/images/Free-ship/free-ship-red.png";
import * as ProductService from "../..//service/ProductService";
import freeShip from "../../assets/images/Free-ship/free-ship.png";
import { addOrderProduct, resetOrder } from "../../redux/slides/OrderReducer";
import * as utils from "../../utils";
import "./ProductDetail.scss";

function ProductDetail(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let params = useParams();

  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  let [amountProduct, setAmountProduct] = useState(1);
  let [errorListOrder, setErrorLimitOrder] = useState(false);
  let [productDetails, setProductDetails] = useState({});
  let [isLoading, setIsLoading] = useState(false);
  const getDetailProduct = async () => {
    if (props.productName !== null) {
      const res = await ProductService.getDetailProduct(props.productName);
      console.log("props.productName", props.productName);
      setIsLoading(true);
      if (res && res.status === "OK") {
        setProductDetails(res.data);
      }
    } else {
      const productNameReverse = params.name;
      const lastSegment = productNameReverse.split("-").join(" ");
      const res = await ProductService.getDetailProduct(lastSegment);
      console.log("res", lastSegment, res);
      if (res && res.status === "OK") {
        setProductDetails(res.data);
      }
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
            userId: user?.id,
            orderItem: {
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
  // let queryDetailProduct = useQuery(["product-details", props.productName], getDetailProduct, {
  //   enabled: !!props.productName,
  // });
  // const { data: productDetails, isLoading } = queryDetailProduct;
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
    getDetailProduct();
    if (productDetails && productDetails.length > 0) {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (user) {
      getDetailProduct();
      if (productDetails && productDetails.length > 0) {
        setIsLoading(false);
      }
    }
  }, [user]);
  return (
    <div className="product-detail-container">
      {/* {isLoading === true && <LoadingPage />} */}
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
              {productDetails && productDetails.sold} <span style={{ color: "#ccc" }}>Đã bán</span>
            </div>
          </div>
          <div className="product-detail-content-right-price">
            <h2>{productDetails && productDetails.price && utils.formattedPrice(productDetails.price)}</h2>{" "}
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

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import * as utils from "../../utils";
import "./CartPage.scss";
import {
  decreaseAmount,
  increaseAmount,
  removeAllProductOrder,
  removeProductOrder,
  selectedOrder,
} from "../../redux/slides/OrderReducer";
import AddressModal from "../../components/Modal/AddressModal";
import AddressComponent from "../../components/UserInfoComponent/AddressComponent";
function CartPage() {
  let user = useSelector((state) => state.user);
  let order = useSelector((state) => state.order);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [priceOrder, setPriceOrder] = useState({
    priceMemo: 0,
    totalPrice: 0,
    discount: 0,
  });
  let [listChecked, setListChecked] = useState([]);

  const handleOnchangeCheck = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value);
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  }; //

  const handleOnchangeCount = (type, name, limit) => {
    if (type === "INCREASE") {
      if (!limit) {
        dispatch(increaseAmount({ name }));
      }
    } else {
      if (!limit) {
        dispatch(decreaseAmount({ name }));
      }
    }
  };

  const handleRemoveProduct = (name) => {
    dispatch(removeProductOrder({ name }));
  };

  const handleCheckAllProduct = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.map((item) => {
        newListChecked.push(item.name);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };
  const handleRemoveAllProduct = () => {
    if (listChecked?.length > 0) {
      dispatch(removeAllProductOrder({ listChecked }));
    }
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, curr) => {
      return total + curr.price * curr.amount;
    }, 0);
    return result;
  }, [order]);
  const discountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, curr) => {
      const discount = ((curr.discount * curr.price) / 100) * curr.amount;
      return total + discount;
    }, 0);
    return result;
  }, [order]);
  const totalPrice = useMemo(() => {
    let result = priceMemo - discountMemo;
    return result;
  }, [priceMemo, discountMemo]);

  const handleOrderProduct = () => {
    if (order?.orderItemsSelected?.length < 1) {
      toast.warning("Vui lòng chọn sản phẩm cần mua!!!");
      return;
    }
    if ((!user?.firstName || !user?.lastName) && !user?.address && !user?.phoneNumber) {
      toast.warning("Vui lòng điền đầy đủ thông tin người nhận!!");
      return;
    }

    dispatch(selectedOrder({ listChecked, priceOrder }));
    navigate("/payment/payment-order");
  };

  // useEffect;

  useEffect(() => {
    setPriceOrder({
      discount: discountMemo,
      priceMemo: priceMemo,
      totalPrice: totalPrice,
    });
    dispatch(selectedOrder({ listChecked }));
  }, [priceMemo, discountMemo, totalPrice, listChecked]);

  return (
    <div className="cart-page-container">
      <AddressModal />
      <div className="cart-page-title px-3">Giỏ hàng</div>
      <div className="cart-page-body row">
        <div className="cart-page-body-left my-3 col-8">
          <div className="cart-page-body-left-top row">
            <div className="cart-page-body-left-top-all-product col-5">
              <input
                type="checkbox"
                id="allProduct"
                className="form-check-input"
                onChange={handleCheckAllProduct}
                checked={listChecked.length === order?.orderItems?.length}
              />
              <label htmlFor="allProduct" className="mx-2">
                Tất cả ( {order && order.orderItems.length} sản phẩm )
              </label>
            </div>
            <div className="cart-page-body-left-top-price col-2">Đơn giá</div>
            <div className="cart-page-body-left-top-amount col-2">Số lượng</div>
            <div className="cart-page-body-left-top-amount col-2">Thành tiền</div>
            <div className="cart-page-body-left-top-remove col-1">
              <i className="fa-regular fa-trash-can" onClick={() => handleRemoveAllProduct()}></i>
            </div>
          </div>

          {order &&
            order.orderItems.length > 0 &&
            order.orderItems.map((item, index) => {
              return (
                <div key={index} className="cart-page-body-left-bottom row my-3">
                  <div className="cart-page-body-left-bottom-b my-2 col-12">
                    <div className="row">
                      <div className="cart-page-body-left-bottom-b-product col-5">
                        <input
                          type="checkbox"
                          onChange={handleOnchangeCheck}
                          checked={listChecked.includes(item?.name)}
                          value={item.name}
                          className="form-check-input"
                        />
                        <div
                          className="cart-page-body-left-bottom-b-product-img"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className="cart-page-body-left-bottom-b-product-name text-lowercase">{item.name}</div>
                      </div>
                      <div className="cart-page-body-left-bottom-b-price col-2">{utils.formattedPrice(item.price)}</div>
                      <div className="cart-page-body-left-bottom-b-amount col-2">
                        <div className="content">
                          <button onClick={() => handleOnchangeCount("DECREASE", item.name, item.amount === 1)}>
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <input
                            type="text"
                            className="text-center"
                            min={1}
                            max={item.countInStock}
                            value={item.amount || 0}
                            disabled
                          />
                          <button
                            onClick={() =>
                              handleOnchangeCount("INCREASE", item.name, item.amount === item.countInStock)
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div className="cart-page-body-left-bottom-b-total-price col-2">
                        {utils.formattedPrice(item.price * item.amount)}
                      </div>
                      <div className="cart-page-body-left-bottom-b-remove col-1">
                        <i onClick={() => handleRemoveProduct(item.name)} className="fa-regular fa-trash-can"></i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="cart-page-body-right my-3 col-3">
          {/* <div className="cart-page-body-right-top row">
            <div className="title">Giao tới</div>
            <div className="user-info ">
              <div className="name text-center">{user && user.firstName + " " + user.lastName}</div>
              <div className="phone text-center">{user && user.phoneNumber}</div>
            </div>
            <div className="address">
              <button className="btn mx-2" data-bs-toggle="modal" data-bs-target="#addressModal">
                Nhà
              </button>
              {user && user.address}
            </div>
          </div> */}
          <AddressComponent />
          <div className="cart-page-body-right-middle row my-3">
            <div className="cart-page-body-right-middle-price">
              <span className="price-text">Tạm tính</span>
              <span className="price-value">{utils.formattedPrice(priceMemo)}</span>
            </div>
            <div className="cart-page-body-right-middle-discount">
              <span>Giảm giá</span>
              <span className="tex">- {utils.formattedPrice(discountMemo)}</span>
            </div>
            <div className="cart-page-body-right-middle-total">
              <span className="total-text">Tổng tiền</span>
              <span className="total-value">{utils.formattedPrice(totalPrice)}</span>
              <span className="total-value-noted">(Đã bao gồm VAT nếu có)</span>
            </div>
          </div>
          <div className="cart-page-body-right-bottom row">
            <button onClick={() => handleOrderProduct()} className="btn-buy">
              Mua hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

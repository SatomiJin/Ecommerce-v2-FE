import { useLocation } from "react-router-dom";

import * as utils from "../../utils";
import * as constant from "../../constant";
import "./PaymentSuccess.scss";
function PaymentSuccess() {
  let delivery = constant.orderOptions.delivery;
  let payment = constant.orderOptions.payment;
  let location = useLocation();
  let { state } = location;
  let listProduct = state && state.order && state.order.orderItemsSelected;
  return (
    <div className="payment-success-container">
      <div className="payment-success-content">
        <div className="payment-success-content-top">
          <div className="payment-success-status text-center">
            <div className="icon">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <div className="text">Đặt hàng thành công</div>
          </div>
        </div>
        <div className="payment-success-content-middle">
          <div className="payment-success-delivery-method">
            <div className="title">Phương thức giao hàng</div>
            <div className="method">
              {payment &&
                payment.map((item) => {
                  if (state.paymentOption === item.value) {
                    return item.name;
                  }
                })}
            </div>
          </div>

          <div className="payment-success-payment-method">
            <div className="title">Phương thức thanh toán</div>
            <div className="method">
              {delivery &&
                delivery.map((item) => {
                  if (state.deliveryOption === item.value) {
                    return item.name;
                  }
                })}
            </div>
          </div>
        </div>
        <div className="payment-success-content-bottom">
          {listProduct &&
            listProduct.length > 0 &&
            listProduct.map((item, index) => {
              return (
                <div key={index} className="product-item row">
                  <div className="product-item-info col-6">
                    <div className="product-img" style={{ backgroundImage: `url(${item.image})` }}></div>
                    <div className="product-name">{item.name}</div>
                  </div>
                  <div className="product-item-quantity col-3">Số lượng: {item.amount}</div>
                  <div className="product-item-price col-3">{utils.formattedPrice(item.price)}</div>
                </div>
              );
            })}
        </div>

        <div className="payment-success-content-total-price">
          <div className="text">Tổng tiền:</div>
          <div className="price">{utils.formattedPrice(state && state.order && state.order.totalPrice)}</div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;

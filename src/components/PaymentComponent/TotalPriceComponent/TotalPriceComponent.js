import { useSelector } from "react-redux";

import * as utils from "../../../utils";
import "./TotalPriceComponent.scss";

function TotalPriceComponent(props) {
  let { paymentOption } = props;
  let order = useSelector((state) => state.order);
  let totalPrice = order?.shippingPrice + order?.totalPrice;
  return (
    <div className="total-price-component-container">
      <div className="total-price-component-body row">
        <div className="total-price-component-body-top">
          <div className="text">
            <div className="text-title">Đơn hàng</div>
            <div className="text-product">
              {order && order?.orderItemsSelected?.length} sản phẩm <span>Xem thông tin</span>
            </div>
          </div>
          <div className="change-product">Thay đổi</div>
        </div>
        <div className="total-price-component-body-middle">
          <div className="provisional-price">
            <div className="text">Tạm tính</div>
            <div className="price">{utils.formattedPrice(order?.provisionalPrice)}</div>
          </div>
          <div className="provisional-price">
            <div className="text">Giảm giá</div>
            <div className="price">- {utils.formattedPrice(order?.discountPrice)}</div>
          </div>
          <div className="delivery-price">
            <div className="text">Phí vận chuyển</div>
            <div className="prices">{utils.formattedPrice(order?.shippingPrice)}</div>
          </div>
        </div>
        <div className="total-price-component-body-bottom">
          <div className="text">Tổng tiền:</div>
          <div className="price">{utils.formattedPrice(totalPrice)}</div>
          <div className="noted">(Đã bao gồm VAT nếu có)</div>
        </div>
        <div className="total-price-component-body-btn">
          <button className="btn col-12 btn-order">Đặt hàng</button>
        </div>
      </div>
    </div>
  );
}

export default TotalPriceComponent;

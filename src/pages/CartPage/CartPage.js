import { useSelector } from "react-redux";

import * as utils from "../../utils";
import "./CartPage.scss";
function CartPage() {
  let user = useSelector((state) => state.user);
  return (
    <div className="cart-page-container">
      <div className="cart-page-title px-3">Giỏ hàng</div>
      <div className="cart-page-body row">
        <div className="cart-page-body-left my-3 col-8">
          <div className="cart-page-body-left-top row">
            <div className="cart-page-body-left-top-all-product col-5">
              <input type="checkbox" id="allProduct" className="form-check-input" />
              <label htmlFor="allProduct" className="mx-2">
                Tất cả (n sản phẩm)
              </label>
            </div>
            <div className="cart-page-body-left-top-price col-2">Đơn giá</div>
            <div className="cart-page-body-left-top-amount col-2">Số lượng</div>
            <div className="cart-page-body-left-top-amount col-2">Thành tiền</div>
            <div className="cart-page-body-left-top-remove col-1">
              <i className="fa-regular fa-trash-can"></i>
            </div>
          </div>
          <div className="cart-page-body-left-bottom row my-3">
            <div className="cart-page-body-left-bottom-b my-2 col-12">
              <div className="row">
                <div className="cart-page-body-left-bottom-b-product col-5">
                  <input type="checkbox" className="form-check-input" />
                  <div className="cart-page-body-left-bottom-b-product-img"></div>
                  <div className="cart-page-body-left-bottom-b-product-name text-lowercase">
                    SAMSUNG GALAXY WATCH6 CLASSIC 47MM
                  </div>
                </div>
                <div className="cart-page-body-left-bottom-b-price col-2">{utils.formattedPrice(200000)}</div>
                <div className="cart-page-body-left-bottom-b-amount col-2">
                  <div className="content">
                    <button>-</button>
                    <input type="text" />
                    <button>+</button>
                  </div>
                </div>
                <div className="cart-page-body-left-bottom-b-total-price col-2">{utils.formattedPrice(200000)}</div>
                <div className="cart-page-body-left-bottom-b-remove col-1">
                  <i className="fa-regular fa-trash-can"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cart-page-body-right my-3 col-3"></div>
      </div>
    </div>
  );
}

export default CartPage;

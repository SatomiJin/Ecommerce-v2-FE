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
        <div className="cart-page-body-right my-3 col-3">
          <div className="cart-page-body-right-top row">
            <div className="title">Giao tới</div>
            <div className="user-info ">
              <div className="name text-center">Đồng Hữu Trọng</div>
              <div className="phone text-center">0349186599</div>
            </div>
            <div className="address">
              <span>Nhà</span>
              Tổ 8, Khu Phố Phú Xuân,Phường Phú Thịnh,Thị Xã Bình Long,Tỉnh Bình Phước, Phường Phú Thịnh, Thị xã Bình
              Long, Bình Phước
            </div>
          </div>
          <div className="cart-page-body-right-middle row my-3">
            <div className="cart-page-body-right-middle-price">
              <span className="price-text">Tạm tính</span>
              <span className="price-value">{utils.formattedPrice(200000)}</span>
            </div>
            <div className="cart-page-body-right-middle-total">
              <span className="total-text">Tổng tiền</span>
              <span className="total-value">{utils.formattedPrice(200000)}</span>
              <span className="total-value-noted">(Đã bao gồm VAT nếu có)</span>
            </div>
          </div>
          <div className="cart-page-body-right-bottom row">
            <button className="btn-buy">Mua hàng</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

import { useSelector, useDispatch } from "react-redux";

import "./ProductComponent.scss";
import * as utils from "../../../utils";
import { useEffect } from "react";
import { shippingPrice } from "../../../redux/slides/OrderReducer";
function ProductComponent(props) {
  let { deliveryOption } = props;
  let order = useSelector((state) => state.order);
  let dispatch = useDispatch();

  let listProduct = order?.orderItemsSelected;
  //useEffect
  useEffect(() => {
    dispatch(shippingPrice({ methodShipping: deliveryOption }));
  }, [deliveryOption]);
  return (
    <div className="product-component-container">
      <div className="product-component-title col-8">
        Giao hàng tiết kiêm <span>{utils.formattedPrice(order?.shippingPrice)}</span>
      </div>
      {listProduct &&
        listProduct.length > 0 &&
        listProduct.map((item, index) => {
          return (
            <div key={index} className="product-component-content row">
              <div className="product-component-content-product col-6">
                <div
                  className="product-component-content-product-img"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className="product-component-content-product-name">
                  {item.name}
                  <div>Số lượng: {item.amount}</div>
                </div>
              </div>
              <div className="product-component-content-price col-2 text-center">
                {utils.formattedPrice(item.price)}
              </div>
              <div className="product-component-content-delivery col-4">
                <div className="content">
                  <i className="fa-solid fa-truck"></i> Được giao bởi Satomi Jin
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ProductComponent;

import "./DeliveryMethod.scss";
import * as constant from "../../../constant";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
function DeliveryMethod(props) {
  let { handleOnChangeDelivery } = props;
  let dispatch = useDispatch();
  let deliveryMethod = constant.orderOptions.delivery;

  const handleChooseDelivery = (e) => {
    handleOnChangeDelivery(e.target.value);
  };
  return (
    <div className="delivery-method-container">
      <div className="delivery-method-title">Chọn hình thức giao hàng</div>
      <div className="delivery-method-body">
        {deliveryMethod?.map((item, index) => {
          return (
            <div className="form-group" key={index}>
              <input
                type="radio"
                onChange={(e) => handleChooseDelivery(e)}
                value={item.value}
                // defaultChecked={index === 0}
                defaultChecked={item.value === "save"}
                className="form-check-input"
                id={item.value}
                name="delivery"
              />
              <label style={{ cursor: "pointer" }} className="form-check-label mx-2" htmlFor={item.value}>
                {item.name}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeliveryMethod;

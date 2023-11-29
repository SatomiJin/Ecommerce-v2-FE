import "./PaymentMethod.scss";
import * as constant from "../../../constant";
import { useEffect } from "react";

function PaymentMethod(props) {
  let { handleOnChangePayment } = props;
  const handleChooseMethod = (e) => {
    handleOnChangePayment(e.target.value);
  };
  let paymentMethod = constant.orderOptions.payment;

  return (
    <div className="payment-method-container">
      <div className="payment-method-title">Chọn hình thức thanh toán</div>
      <div className="payment-method-content p-1">
        {paymentMethod?.map((item, index) => {
          return (
            <div key={index} className="form-group">
              <input
                onChange={(e) => handleChooseMethod(e)}
                type="radio"
                value={item.value}
                id={item.value}
                defaultChecked={index === 2}
                name="group"
                className="form-check-input"
              />
              <label htmlFor={item.value} className="form-check-label mx-2">
                {item.name}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PaymentMethod;

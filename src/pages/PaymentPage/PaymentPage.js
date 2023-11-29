import { useState } from "react";
import DeliveryMethod from "../../components/PaymentComponent/DeliveryMethod/DeliveryMethod";
import PaymentMethod from "../../components/PaymentComponent/PaymentMethod/PaymentMethod";
import TotalPriceComponent from "../../components/PaymentComponent/TotalPriceComponent/TotalPriceComponent";
import ProductComponent from "../../components/PaymentComponent/product/ProductComponent";
import AddressComponent from "../../components/UserInfoComponent/AddressComponent";
import "./PaymentPage.scss";
function PaymentPage() {
  let [deliveryOption, setDeliveryOptions] = useState("save");
  let [paymentOption, setPaymentOption] = useState("normal");
  const handleOnChangeDelivery = (method) => {
    setDeliveryOptions(method);
  };
  const handleOnChangePayment = (method) => {
    setPaymentOption(method);
  };
  return (
    <div className="payment-page-container">
      <div className="payment-page-title">Thanh toán</div>
      <div className="payment-page-content row">
        <div className="payment-page-content-left col-8">
          <div className="payment-page-content-left-top">
            <DeliveryMethod handleOnChangeDelivery={handleOnChangeDelivery} />
            <ProductComponent deliveryOption={deliveryOption} />
          </div>
          <div className="payment-page-content-left-bottom">
            <PaymentMethod handleOnChangePayment={handleOnChangePayment} />
          </div>
        </div>
        <div className="payment-page-content-right col-4">
          <div className="payment-page-content-right-top">
            <AddressComponent />
          </div>
          <div className="payment-page-content-right-bottom">
            <TotalPriceComponent paymentOption={paymentOption} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;

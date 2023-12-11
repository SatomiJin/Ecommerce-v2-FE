import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import LoadingPage from "../../LoadingPage/LoadingPage";
import * as utils from "../../../utils";
import * as OrderService from "../../../service/OrderService";
import * as PaymentService from "../../../service/PaymentService";
import { useMutationHook } from "../../../hooks/useMutationHook";
import "./TotalPriceComponent.scss";
import { removeAllProductOrder } from "../../../redux/slides/OrderReducer";
import { PayPalButtons } from "@paypal/react-paypal-js";

function TotalPriceComponent(props) {
  let navigate = useNavigate();
  let { paymentOption, deliveryOption } = props;
  let [loadingPage, setLoadingPage] = useState(false);
  let order = useSelector((state) => state.order);
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let [paypalSDK, setPaypalSDK] = useState(false);

  let totalPrice = order?.shippingPrice + order?.totalPrice;
  let changeProduct = () => {
    navigate("/cart-product");
  };

  //mutation
  const mutationCreateOrder = useMutationHook(async (data) => {
    setLoadingPage(true);
    const { token, ...rests } = data;
    const res = await OrderService.createOrder(token, rests);
    if (res && res.status === "OK") {
      setLoadingPage(false);
      toast.success("Đặt hàng thành công!!!");
      const listOrdered = [];
      order?.orderItemsSelected?.map((item) => {
        listOrdered.push(item.name);
      });
      navigate("/payment/payment-success", {
        state: {
          deliveryOption,
          paymentOption,
          order: order,
        },
      });
      dispatch(removeAllProductOrder({ listChecked: listOrdered }));
    } else {
      setLoadingPage(false);
      toast.error("Đặt hàng thất bại, Vui lòng thử lại");
    }
    return res;
  });

  const handleCreateOrder = async () => {
    if (
      user &&
      user.access_token &&
      (user.firstName || user.lastName) &&
      user.address &&
      user.phoneNumber &&
      order &&
      order.orderItemsSelected?.length > 0
    ) {
      await mutationCreateOrder.mutate({
        token: user?.access_token,
        email: user.email,
        userId: user?.id,
        orderItems: order?.orderItemsSelected,
        totalPrice: order?.totalPrice,
        shippingPrice: order?.shippingPrice,
        shippingAddress: user?.address,
        paymentMethod: order?.paymentMethod,
        shippingMethod: order?.methodShipping,
      });
    }
  };

  //paypal setup
  const handleAddPayPalScript = async () => {
    const res = await PaymentService.getConfigPayPal();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${res.data}`;
    script.async = true;
    script.onload = () => {
      setPaypalSDK(true);
    };
    document.body.appendChild(script);
  };
  const onApprove = async (data, actions) => {
    if (
      user &&
      user.access_token &&
      (user.firstName || user.lastName) &&
      user.address &&
      user.phoneNumber &&
      order &&
      order.orderItemsSelected?.length > 0
    ) {
      await mutationCreateOrder.mutate({
        token: user?.access_token,
        email: user.email,
        isPaid: paymentOption === "paypal" ? "P2" : "P1",
        userId: user?.id,
        orderItems: order?.orderItemsSelected,
        totalPrice: order?.totalPrice,
        shippingPrice: order?.shippingPrice,
        shippingAddress: user?.address,
        paymentMethod: order?.paymentMethod,
        shippingMethod: order?.methodShipping,
      });
    }
  };

  const createOrder = (data, actions) => {
    let total = Math.round(order?.totalPrice / 23000);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total,
          },
        },
      ],
    });
  };
  //useEffect
  useEffect(() => {
    if (!window.paypal) {
      handleAddPayPalScript();
    } else {
      setPaypalSDK(true);
    }
  }, []);

  return (
    <div className="total-price-component-container">
      {loadingPage === true && <LoadingPage />}
      <div className="total-price-component-body row">
        <div className="total-price-component-body-top">
          <div className="text">
            <div className="text-title">Đơn hàng</div>
            <div className="text-product">
              {order && order?.orderItemsSelected?.length} sản phẩm <span>Xem thông tin</span>
            </div>
          </div>
          <div className="change-product" onClick={changeProduct}>
            Thay đổi
          </div>
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
          {paymentOption === "paypal" && paypalSDK ? (
            <div className="col-12">
              <PayPalButtons
                // amount={Math.round(order?.totalPrice / 23000)}
                createOrder={createOrder}
                onApprove={onApprove}
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onError={(e) => {
                  console.error(e);
                }}
              />
            </div>
          ) : (
            <button className="btn col-12 btn-order" onClick={handleCreateOrder}>
              Đặt hàng
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TotalPriceComponent;

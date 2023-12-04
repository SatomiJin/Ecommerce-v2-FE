import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

import * as utils from "../../utils";
import * as OrderService from "../../service/OrderService";
import "./DetailOrderPage.scss";
function DetailOrderPage() {
  let user = useSelector((state) => state.user);
  let location = useLocation();
  let [detailOrder, setDetailOrder] = useState({});
  let [listProduct, setListProduct] = useState([]);
  //
  const getDetailOrder = async () => {
    let res = await OrderService.getDetailOrder(user?.access_token, location && location?.state, user?.email);
    if (res && res.status === "OK") {
      setDetailOrder(res?.data);
      setListProduct(res?.data?.orderItems);
    }
  };

  //useEffect
  useEffect(() => {
    getDetailOrder();
  }, []);
  const handleFormatDate = (date) => {
    let formatted = "";
    if (date) {
      let createdAt = new Date(date);
      formatted = format(createdAt, "dd/MM/yyyy");
    }
    return formatted;
  };
  return (
    <div className="detail-order-container">
      <div className="detail-order-title">Chi tiết đơn hàng</div>
      <div className="detail-order-body">
        <div className="detail-order-body-order container">
          <div className="address-payment-delivery row">
            <div className="address col-3">
              <div className="title">Địa chỉ giao hàng</div>
              <div className="content">
                <div className="name" style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                  {detailOrder?.userData?.firstName + " " + detailOrder?.userData?.lastName}
                </div>
                <div className="shipping-address" style={{ fontSize: "1.2rem", marginBottom: "0.3rem" }}>
                  {detailOrder?.shippingAddress}
                </div>
                <div className="phone" style={{ fontSize: "1.2rem" }}>
                  {detailOrder?.userData?.phoneNumber}
                </div>
              </div>
            </div>
            <div className="payment col-4">
              <div className="title">Hình thức giao hàng</div>
              <div className="content">
                <div className="method" style={{ fontSize: "1.2rem" }}>
                  <i className="fa-solid fa-truck-fast" style={{ fontSize: "1.2rem" }}></i>{" "}
                  {detailOrder?.shippingMethod}
                </div>
                <div className="status" style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}>
                  {utils.deliveryStatus(detailOrder?.status)}
                </div>
                <div
                  className="shipping-price"
                  style={{ fontSize: "1.2rem", fontWeight: 600, color: "rgb(255, 66, 78)" }}
                >
                  {utils.formattedPrice(detailOrder?.shippingPrice)}
                </div>
              </div>
            </div>
            <div className="delivery col-4">
              <div className="title">Phương thức thanh toán</div>
              <div className="content">
                <div className="method" style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                  {detailOrder?.paymentMethod}
                </div>
                <div className="status" style={{ fontSize: "1.2rem", fontWeight: 600, color: "rgb(255, 66, 78)" }}>
                  {utils.paymentStatus(detailOrder?.isPaid)}
                </div>
              </div>
            </div>
          </div>
          <div className="product-table">
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th scope="col">Sản phẩm</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Giảm giá</th>
                  <th scope="col">tạm tính</th>
                </tr>
              </thead>
              <tbody>
                {listProduct &&
                  listProduct.length > 0 &&
                  listProduct.map((item, index) => {
                    let provisionalPrice = item.price - (item.discount * item.price) / 100;
                    return (
                      <tr className="product text-center align-items-center">
                        <td>
                          <img src={item.image} alt="" />
                        </td>
                        <td>{item.name}</td>
                        <td>{utils.formattedPrice(item.price)}</td>
                        <td>{item.amount}</td>
                        <td>{item.discount}%</td>
                        <td>{utils.formattedPrice(provisionalPrice)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="footer-order">
            <div className="create-at">Ngày đặt: {handleFormatDate(detailOrder?.createdAt)}</div>
            <div className="total-price">
              Tổng tiền: <span>{utils.formattedPrice(detailOrder.totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailOrderPage;

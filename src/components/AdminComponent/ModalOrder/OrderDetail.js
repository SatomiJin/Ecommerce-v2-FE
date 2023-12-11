import { useEffect, useState } from "react";
import { format } from "date-fns";
import * as utils from "../../../utils";
import "./OrderDetail.scss";
function OrderDetail(props) {
  let { detailOrder } = props;
  let [listProduct, setListProduct] = useState([]);
  let [userInfo, setUserInfo] = useState({});
  let [orderCreatedAt, setOrderCreatedAt] = useState("");
  useEffect(() => {
    setListProduct(detailOrder?.orderItems);
    if (detailOrder && detailOrder.createdAt) {
      let created = new Date(detailOrder?.createdAt);
      setOrderCreatedAt(created);
      setUserInfo(detailOrder?.user);
    }
  }, [detailOrder]);
  return (
    <div className="order-detail-container">
      <div
        className="modal modal-lg fade"
        id="orderDetail"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Thông tin đơn hàng
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body container">
              <div className="user-info">
                <div className="name-address-phone">
                  <span className="name">{userInfo?.firstName + " " + userInfo?.lastName}</span>
                  <span className="phone">{userInfo?.phoneNumber}</span>
                  <div className="address">Địa chỉ: {userInfo?.address}</div>
                </div>
              </div>
              <div className="list-product">
                {listProduct &&
                  listProduct?.length > 0 &&
                  listProduct.map((item, index) => {
                    return (
                      <div key={index} className="product row">
                        <div className="name-img col-4">
                          <div className="img" style={{ backgroundImage: `url(${item.image})` }}></div>
                          <div className="name">{item.name}</div>
                        </div>
                        <div className="amount col-3">Số lượng: {item.amount}</div>
                        <div className="price col-3">{utils.formattedPrice(item.price)}</div>
                        <div className="discount col-2">- {item.discount}%</div>
                      </div>
                    );
                  })}
              </div>
              <div className="total-create-at">
                <div className="created-at">Ngày đặt: {orderCreatedAt && format(orderCreatedAt, "dd/MM/yyy")}</div>
                <div className="total-price">
                  Tổng thanh toán: <span>{utils.formattedPrice(detailOrder?.totalPrice)}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-lg btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;

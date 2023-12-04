import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useMutationHook } from "../../hooks/useMutationHook";
import * as OrderService from "../../service/OrderService";
import * as utils from "../../utils";
import "./MyOrderPage.scss";
function MyOrderPage() {
  let user = useSelector((state) => state.user);
  let navigate = useNavigate();
  let [listOrder, setListOrder] = useState([]);

  const handleGetAllMyProduct = async (token, userId, email) => {
    if (user) {
      let res = await OrderService.getAllMyOrder(token, userId, email);
      if (res && res.status === "OK") {
        setListOrder(res.data);
      }
    }
  };
  const mutationReceived = useMutationHook(async (data) => {
    let { orderId } = data;
    if (user && orderId) {
      let res = await OrderService.receivedOrder(user?.access_token, orderId, user?.email);
      return res;
    }
  });
  let { data } = mutationReceived;
  const handleReceivedOrder = async (orderId) => {
    mutationReceived.mutate({ orderId: orderId });
  };

  const handleRedirectDetailPage = (name) => {
    navigate(`/product/product-detail/${name.toLowerCase().replace(/\s/g, "-")}`, { state: name });
  };
  const handleGetDetailOrder = (orderId) => {
    navigate(`/user/your-order/detail-order`, { state: orderId });
  };

  //useEffect
  useEffect(() => {
    if (user && user?.id && user?.email) {
      handleGetAllMyProduct(user?.access_token, user?.id, user?.email);
    }
  }, []);

  useEffect(() => {
    if (data?.status === "OK") {
      toast.success("Cập nhật trạng thái đơn hàng thành công");
      if (user && user?.id && user?.email) {
        handleGetAllMyProduct(user?.access_token, user?.id, user?.email);
      }
    }
    if (data?.status === "ERROR") {
      toast.error("Đơn hàng chưa được xác nhận");
    }
  }, [data]);
  return (
    <div className="my-order-container">
      <div className="my-order-title">Đơn hàng của tôi</div>
      <div className="my-order-body">
        {listOrder && listOrder.length > 0 ? (
          listOrder.map((item, index) => {
            let createdAtOrder = new Date(item.createdAt);
            return (
              <div key={index} className="my-order-body-wrapper">
                <div className="status">
                  <div className="status-title">Trang thái đơn hàng</div>
                  <div className="status-content">
                    <div className="delivery">
                      Giao hàng: &nbsp; <span>{utils.deliveryStatus(item.status)}</span>
                    </div>
                    <div className="payment">
                      Thanh toán &nbsp;<span>{utils.paymentStatus(item.isPaid)}</span>
                    </div>
                  </div>
                </div>
                {item.orderItems.map((product, productIndex) => {
                  return (
                    <div key={productIndex} className="my-order-body-product row">
                      <div className="product col-6">
                        <div className="img" style={{ backgroundImage: `url(${product.image})` }}></div>
                        <div className="name">{product.name}</div>
                      </div>
                      <div className="quantity col-2">Số lượng: {product.amount}</div>
                      <div className="price col-2">{utils.formattedPrice(product.price)}</div>
                      <div className="buy-again col-2" onClick={() => handleRedirectDetailPage(product.name)}>
                        Mua lại
                      </div>
                    </div>
                  );
                })}
                <div className="total-price">
                  <div className="created">Ngày đặt: {format(createdAtOrder, "dd/MM/yyyy")}</div>

                  <div className="price">
                    Tổng thanh toán: &nbsp;
                    <span>{utils.formattedPrice(item.totalPrice)}</span>
                  </div>
                </div>
                <div className="my-order-footer">
                  <button className="btn btn-success" onClick={() => handleGetDetailOrder(item.id)}>
                    Chi tiết đơn hàng
                  </button>
                  <button
                    disabled={utils.deliveryStatus(item.status) === "Đã nhận hàng" ? true : false}
                    // disabled={false}
                    className="btn received"
                    onClick={() => handleReceivedOrder(item.id)}
                  >
                    Đã nhận hàng
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="non-order">Chưa có đơn hàng nào...</div>
        )}
      </div>
    </div>
  );
}

export default MyOrderPage;

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";

import Loading from "../../components/Loading/Loading";
import * as utils from "../../utils";
import * as OrderService from "../../service/OrderService";
import "./AdminOrder.scss";
import OrderDetail from "./ModalOrder/OrderDetail";

function AdminOrder() {
  let user = useSelector((state) => state.user);
  let [listOrder, setListOrder] = useState([]);
  let [updateList, setUpdateList] = useState(false);
  let [detailOrder, setDetailOrder] = useState({});
  const handleUpdateStatus = (status) => {
    setUpdateList(status);
  };
  const handleGetAllOrder = async () => {
    if (user && user?.access_token) {
      let res = await OrderService.getAllOrder(user.access_token);
      if (res && res.status === "OK") {
        setListOrder(res.data);
      }
    }
  };
  const handleGetDetailOrder = (item) => {
    setDetailOrder(item);
  };
  const handleConfirmOrder = async (orderId) => {
    let res = await OrderService.confirmOrder(user?.access_token, orderId, user?.email);
    handleUpdateStatus(true);
    if (res && res.status === "OK") {
      toast.success("Xác nhận đơn hàng thành công!!");
    } else {
      handleUpdateStatus(false);
      toast.error("Xác nhận đơn hàng thất bại!!");
    }
  };
  const handleDeleteOrder = async (orderId) => {
    const userConfirmed = window.confirm(`Bạn có muốn xóa đơn hàng này không?`);
    if (userConfirmed) {
      let res = await OrderService.deleteOrderById(user?.access_token, orderId);
      setUpdateList(true);
      if (res && res.status === "OK") {
        toast.success("Xóa đơn hàng thành công");
      } else {
        toast.errors("Xóa đơn hàng thất bại");
        setUpdateList(false);
      }
    }
  };
  //useEffect
  useEffect(() => {
    setUpdateList(true);
    handleGetAllOrder();
    setUpdateList(false);
  }, []);
  useEffect(() => {
    if (updateList === true) {
      handleGetAllOrder();
      setUpdateList(false);
    }
  }, [updateList]);
  return (
    <>
      <div className="admin-order-container">
        <div className="admin-order-title">Quản lý đơn hàng</div>

        <div className="admin-order-body">
          <div className="admin-order-table container">
            <Loading isLoading={updateList}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên khách hàng</th>
                    <th scope="col">Trạng thái đơn hàng</th>
                    <th scope="col">Thanh toán</th>
                    <th scope="col">Ngày đặt</th>
                    <th scope="col">Thao tác đơn hàng</th>
                  </tr>
                </thead>
                <tbody>
                  {listOrder &&
                    listOrder?.length > 0 &&
                    listOrder.map((item, index) => {
                      let userData = item.user;
                      let createdAt = new Date(item.createdAt);
                      return (
                        <tr key={index}>
                          <th scope="row">{index}</th>
                          <td>{userData.firstName + " " + userData.lastName}</td>
                          <td>{utils.deliveryStatus(item.status)}</td>
                          <td>{utils.paymentStatus(item.isPaid)}</td>
                          <td>{format(createdAt, "dd/MM/yyyy")}</td>
                          <td>
                            <button onClick={() => handleConfirmOrder(item.id)} className="btn btn-success">
                              <i className="fa-solid fa-circle-check"></i>
                            </button>
                            <button
                              className="btn btn-info mx-2"
                              onClick={() => handleGetDetailOrder(item)}
                              data-bs-toggle="modal"
                              data-bs-target="#orderDetail"
                            >
                              <i className="fa-solid fa-circle-info"></i>
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDeleteOrder(item.id)}>
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Loading>
          </div>
        </div>
      </div>
      <div className="modal-order">
        <OrderDetail detailOrder={detailOrder} />
      </div>
    </>
  );
}

export default AdminOrder;

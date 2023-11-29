import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import * as UserService from "../../service/UserService";
import { updateUser } from "../../redux/slides/UserReducer";
function AddressModal() {
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let [orderInfo, setOrderInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });

  const handleOnchange = (e) => {
    let copyState = { ...orderInfo };
    copyState[e.target.name] = e.target.value;
    setOrderInfo({ ...copyState });
  };

  const handleUpdateInfoOrder = async () => {
    let res = await UserService.updateUserInfo(orderInfo, user?.access_token);
    if (res && res.status === "OK") {
      dispatch(updateUser(res.userUpdate));
      toast.success("Cập nhật thông tin thành công!!!");
    } else {
      toast.error("Cập nhật thông tin thất bại!!");
    }
  };
  //useEffect
  useEffect(() => {
    setOrderInfo({
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumber,
      address: user?.address,
    });
  }, [user]);
  return (
    <div className="modal fade" id="addressModal" tabIndex="-1" aria-labelledby="addressModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{
              backgroundColor: "#8EC5FC",
              backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
            }}
          >
            <h5 className="modal-title" id="exampleModalLabel">
              Thông tin giao hàng
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="modal-body-content p-2 row">
              <div className="form-group col-6">
                <label htmlFor="firstName">Họ:</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={orderInfo?.firstName}
                  onChange={(e) => handleOnchange(e)}
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="lastName">Họ:</label>
                <input
                  id="lastName"
                  type="text"
                  onChange={(e) => handleOnchange(e)}
                  name="lastName"
                  className="form-control"
                  value={orderInfo?.lastName}
                />
              </div>

              <div className="form-group col-12">
                <label htmlFor="address">Địa chỉ:</label>
                <input
                  id="address"
                  type="text"
                  onChange={(e) => handleOnchange(e)}
                  name="address"
                  className="form-control"
                  value={orderInfo?.address}
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="phoneNumber">Số điện thoại:</label>
                <input
                  id="phoneNumber"
                  type="text"
                  onChange={(e) => handleOnchange(e)}
                  name="phoneNumber"
                  className="form-control"
                  value={orderInfo?.phoneNumber}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Đóng
            </button>
            <button
              type="button"
              onClick={() => handleUpdateInfoOrder()}
              data-bs-dismiss="modal"
              className="btn btn-outline-success"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressModal;

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import "./UpdateModal.scss";
import { useMutationHook } from "../../../hooks/useMutationHook";
import * as UserService from "../../../service/UserService";
import Loading from "../../Loading/Loading";

function UpdateModal(props) {
  const user = useSelector((state) => state.user);
  let [isLoading, setIsLoading] = useState(false);
  let [detailUserUpdate, setDetailUserUpdate] = useState({
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    roleId: "",
    address: "",
  });
  //useEffect
  useEffect(() => {
    setIsLoading(true);
    setDetailUserUpdate({
      email: props.detailUser.email,
      firstName: props.detailUser.firstName,
      lastName: props.detailUser.lastName,
      gender: props.detailUser.gender,
      phoneNumber: props.detailUser.phoneNumber,
      roleId: props.detailUser.roleId,
      address: props.detailUser.address,
    });
    setIsLoading(false);
  }, [props.detailUser]);

  const handleOnchange = (e) => {
    let copyState = { ...detailUserUpdate };
    copyState[e.target.name] = e.target.value;
    setDetailUserUpdate({
      ...copyState,
    });
  };

  //mutation
  const mutationUpdate = useMutationHook(async (data) => {
    let { token, dataUser } = data;
    const res = await UserService.updateUserInfo(dataUser, token);
    if (res && res.status === "OK") {
      await props.handleUpdated(true);
      toast.success("Cập nhật thông tin thành công!!");
    } else {
      toast.success("Cập nhật thông tin thất bại!!");
    }
    return res.data;
  });
  const { isSuccess: isSuccessUpdated } = mutationUpdate;

  //update
  const handleUpdateUser = () => {
    mutationUpdate.mutate({ dataUser: { ...detailUserUpdate }, token: user && user.access_token });
  };
  return (
    <div className="update-modal-user">
      <div
        className="modal modal-lg fade"
        id="updateUserModal"
        tabIndex="-1"
        aria-labelledby="updateUserModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Cập nhật thông tin người dùng
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <Loading isLoading={isLoading}>
              <div className="modal-body p-3">
                <div className="modal-body-form-content row">
                  <div className="form-group">
                    <label>Địa chỉ Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      disabled
                      value={(detailUserUpdate && detailUserUpdate.email) || ""}
                      style={{ cursor: "not-allowed" }}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="firstName">Họ</label>
                    <input
                      type="text"
                      id="firstName"
                      value={(detailUserUpdate && detailUserUpdate.firstName) || ""}
                      onChange={(e) => handleOnchange(e)}
                      name="firstName"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="lastName">Tên:</label>
                    <input
                      type="text"
                      value={(detailUserUpdate && detailUserUpdate.lastName) || ""}
                      onChange={(e) => handleOnchange(e)}
                      id="lastName"
                      name="lastName"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-12">
                    <label htmlFor="address">Địa chỉ:</label>
                    <input
                      type="text"
                      value={(detailUserUpdate && detailUserUpdate.address) || ""}
                      onChange={(e) => handleOnchange(e)}
                      id="address"
                      name="address"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-4">
                    <label htmlFor="phoneNumber">Số điện thoại:</label>
                    <input
                      type="text"
                      value={(detailUserUpdate && detailUserUpdate.phoneNumber) || ""}
                      onChange={(e) => handleOnchange(e)}
                      id="phoneNumber"
                      name="phoneNumber"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-4">
                    <label htmlFor="gender">Giới tính:</label>
                    <select
                      name="gender"
                      id="gender"
                      value={(detailUserUpdate && detailUserUpdate.gender) || ""}
                      onChange={(e) => handleOnchange(e)}
                      className="form-select"
                    >
                      <option value="M">Nam</option>
                      <option value="F">Nữ</option>
                      <option value="O">Khác</option>
                    </select>
                  </div>
                  <div className="form-group col-4">
                    <label htmlFor="roleId">Quyền:</label>
                    <select
                      name="roleId"
                      id="roleId"
                      value={detailUserUpdate && detailUserUpdate.roleId}
                      onChange={(e) => handleOnchange(e)}
                      className="form-select"
                    >
                      <option value="R1">ADMIN</option>
                      <option value="R2">Cửa hàng</option>
                      <option value="R3">Khách hàng</option>
                    </select>
                  </div>
                </div>
              </div>
            </Loading>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
              <button
                type="button"
                onClick={() => handleUpdateUser()}
                data-bs-dismiss={isSuccessUpdated === true ? "modal" : ""}
                className="btn btn-primary"
              >
                Cập nhật thông tin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal;

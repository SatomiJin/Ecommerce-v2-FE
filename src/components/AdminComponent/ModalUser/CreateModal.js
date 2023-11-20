import { useState } from "react";
import * as UserService from "../../../service/UserService";
import { toast } from "react-toastify";
function CreateModal(props) {
  let [isCreate, setIsCreate] = useState(false);
  let [dataUser, setDataUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
    gender: "",
    roleId: "",
  });
  const handleCreateUser = async (e) => {
    e.preventDefault();
    let res = await UserService.signUpUser(dataUser);
    if (res && res.status === "OK") {
      setIsCreate(true);
      props.handleCreated(true);
      await setDataUser({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        address: "",
        phoneNumber: "",
        gender: "",
        roleId: "",
      });
      toast.success("Tạo người dùng thành công!!!");
    } else {
      toast.error("Tạo người dùng thất bại!!!!");
    }
  };
  const handleOnchange = (e) => {
    let copyState = { ...dataUser };
    copyState[e.target.name] = e.target.value;
    setDataUser({ ...copyState });
  };

  return (
    <div className="modal fade" id="createUser" tabIndex="-1" aria-labelledby="createUser" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{ backgroundColor: "#8EC5FC", backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)" }}
          >
            <h5 className="modal-title" id="exampleModalLabel">
              Thêm người dùng mới
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={(e) => handleCreateUser(e)}>
            <div className="modal-body row">
              <div className="form-group col-12">
                <label>Địa chỉ email:</label>
                <input
                  type="text"
                  value={dataUser.email}
                  onChange={(e) => handleOnchange(e)}
                  className="form-control"
                  name="email"
                />
              </div>
              <div className="form-group col-6">
                <label>Họ:</label>
                <input
                  type="text"
                  value={dataUser.firstName}
                  onChange={(e) => handleOnchange(e)}
                  className="form-control"
                  name="firstName"
                />
              </div>
              <div className="form-group col-6">
                <label>Tên:</label>
                <input
                  type="text"
                  value={dataUser.lastName}
                  onChange={(e) => handleOnchange(e)}
                  className="form-control"
                  name="lastName"
                />
              </div>
              <div className="form-group col-6">
                <label>Mật khẩu:</label>
                <input
                  type="password"
                  value={dataUser.password}
                  onChange={(e) => handleOnchange(e)}
                  className="form-control"
                  name="password"
                />
              </div>
              <div className="form-group col-6">
                <label>Nhập lại mật khẩu:</label>
                <input
                  type="password"
                  value={dataUser.confirmPassword}
                  onChange={(e) => handleOnchange(e)}
                  className="form-control"
                  name="confirmPassword"
                />
              </div>
              <div className="form-group col-6">
                <label>Địa chỉ:</label>
                <input
                  type="text"
                  value={dataUser.address}
                  onChange={(e) => handleOnchange(e)}
                  className="form-control"
                  name="address"
                />
              </div>
              <div className="form-group col-6">
                <label>Số điện thoại:</label>
                <input
                  type="text"
                  className="form-control"
                  value={dataUser.phoneNumber}
                  onChange={(e) => handleOnchange(e)}
                  name="phoneNumber"
                />
              </div>
              <div className="form-group col-6">
                <label>Giới tính:</label>
                <select
                  className="form-select"
                  value={dataUser.gender}
                  onChange={(e) => handleOnchange(e)}
                  name="gender"
                >
                  <option value="M">Nam</option>
                  <option value="F">Nữ</option>
                  <option value="O">Khác</option>
                </select>
              </div>
              <div className="form-group col-6">
                <label>Quyền:</label>
                <select
                  value={dataUser.roleId}
                  onChange={(e) => handleOnchange(e)}
                  className="form-select"
                  name="roleId"
                >
                  <option value="R1">Admin</option>
                  <option value="R2">Cửa hàng</option>
                  <option value="R3">Người dùng</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
              <button type="submit" data-bs-dismiss={isCreate === true ? "modal" : ""} className="btn btn-primary">
                Tạo người dùng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateModal;

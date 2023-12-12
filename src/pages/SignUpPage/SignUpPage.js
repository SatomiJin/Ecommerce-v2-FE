import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./SignUpPage.scss";
import * as UserService from "../../service/UserService";
import { toast } from "react-toastify";
function SignUpPage() {
  const navigate = useNavigate();
  let [dataSignUp, setDataSignUp] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
    gender: "M",
  });

  const handleOnchange = (e) => {
    let copyState = { ...dataSignUp };
    copyState[e.target.name] = e.target.value;
    setDataSignUp(copyState);
  };

  const handleSignUpUser = async (e) => {
    e.preventDefault();
    let res = await UserService.signUpUser(dataSignUp);

    if (res && res.status === "OK") {
      toast.success(res.message);
      navigate("/sign-in");
    }
    if (res && res.status === "WARNING") {
      toast.warning(res.message);
    }
    if (res && res.status === "ERROR") {
      toast.error("Đăng ký không thành công!!!");
    }
  };
  return (
    <div className="sign-up-page-container">
      <div className="sign-up-page-wrapper">
        <div className="sign-up-page-form container">
          <div className="title text-center">Đăng ký tài khoản ngay</div>
          <form onSubmit={(e) => handleSignUpUser(e)} className="row">
            <div className="form-group col-12">
              <label>Địa chỉ email:</label>
              <input
                type="text"
                className="form-control"
                value={dataSignUp.email}
                name="email"
                onChange={(e) => handleOnchange(e)}
              />
            </div>
            <div className="form-group col-6">
              <label>Họ:</label>
              <input
                type="text"
                className="form-control"
                value={dataSignUp.firstName}
                name="firstName"
                onChange={(e) => handleOnchange(e)}
              />
            </div>
            <div className="form-group col-6">
              <label>Tên:</label>
              <input
                type="text"
                className="form-control"
                value={dataSignUp.lastName}
                name="lastName"
                onChange={(e) => handleOnchange(e)}
              />
            </div>
            <div className="form-group col-6">
              <label>Mật khẩu:</label>
              <input
                type="password"
                className="form-control"
                value={dataSignUp.password}
                name="password"
                onChange={(e) => handleOnchange(e)}
              />
            </div>
            <div className="form-group col-6">
              <label>Nhập lại mật khẩu:</label>
              <input
                type="password"
                className="form-control"
                value={dataSignUp.confirmPassword}
                name="confirmPassword"
                onChange={(e) => handleOnchange(e)}
              />
            </div>
            <div className="form-group col-6">
              <label>Địa chỉ:</label>
              <input
                type="text"
                className="form-control"
                value={dataSignUp.address}
                name="address"
                onChange={(e) => handleOnchange(e)}
              />
            </div>
            <div className="form-group col-3">
              <label>Số điện thoại:</label>
              <input
                type="text"
                className="form-control"
                value={dataSignUp.phoneNumber}
                name="phoneNumber"
                onChange={(e) => handleOnchange(e)}
              />
            </div>
            <div className="form-group col-3">
              <label>Giới tính:</label>
              <select
                value={dataSignUp.gender}
                className="form-select"
                name="gender"
                onChange={(e) => handleOnchange(e)}
              >
                <option value="M">Nam</option>
                <option value="F">Nữ</option>
                <option value="O">Khác</option>
              </select>
            </div>
            <div className="sign-up-page-action col-12 text-center">
              <button type="submit" className="btn btn-sign-up">
                Đăng ký
              </button>
              <Link to="/sign-in">
                <button type="button" className="btn btn-secondary mx-3">
                  <i className="fa-solid fa-right-to-bracket"></i> Quay lại đăng nhập
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;

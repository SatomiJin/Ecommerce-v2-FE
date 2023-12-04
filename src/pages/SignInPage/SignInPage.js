import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import "./SignInPage.scss";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as UserService from "../../service/UserService";
import Loading from "../../components/Loading/Loading";
import { updateUser } from "../../redux/slides/UserReducer";

function SignInPage() {
  const location = useLocation();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const mutation = useMutationHook((data) => UserService.signInUser(data));
  let { data, isLoading } = mutation;
  let dispatch = useDispatch();
  //onChange
  const handleOnchange = (e) => {
    let copyData = { ...dataLogin };
    copyData[e.target.name] = e.target.value;
    setDataLogin({ ...copyData });
  };
  const handleShowPass = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate({
      email: dataLogin.email,
      password: dataLogin.password,
    });
  };
  //useEffect
  useEffect(() => {
    if (data && data.status === "OK") {
      if (location?.state) {
        navigate(`${location.state}`);
      } else {
        navigate("/");
      }

      toast.success("Đăng nhập thành công");
      localStorage.setItem("access_token", JSON.stringify(data && data.access_token));
      localStorage.setItem("refresh_token", JSON.stringify(data && data.refresh_token));
      if (data && data.access_token) {
        const decoded = jwtDecode(data.access_token);
        if (decoded && decoded.id) {
          handleGetDetail(decoded.id, decoded.email, data.access_token);
        }
      }
    }

    if (data && data.status === "ERROR") {
      toast.error("Sai tên đăng nhập hoặc mật khẩu");
    }
  }, [data]);
  //đẩy dữ liệu vào và quản lý vs redux
  const handleGetDetail = async (id, email, token) => {
    let data = {
      id: id,
      email: email,
    };

    let storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailUserById(data, token);
    dispatch(updateUser({ ...res.data, access_token: token, refreshToken: refreshToken }));
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-wrapper">
        <div className="sign-in-content">
          <div className="title text-center">Đăng nhập</div>
          <form className="row" onSubmit={(e) => handleLogin(e)}>
            <div className="form-group col-12">
              <label>Email:</label>
              <input
                value={dataLogin.email}
                name="email"
                required
                onChange={(e) => handleOnchange(e)}
                type="email"
                placeholder="examples@gmail.com"
                className="form-control"
              />
            </div>
            <div className="form-group password-group col-12">
              <label>Mật khẩu:</label>
              <input
                value={dataLogin.password}
                name="password"
                onChange={(e) => handleOnchange(e)}
                required
                type={isShowPassword === true ? "text" : "password"}
                placeholder="Nhập mật khẩu..."
                className="form-control"
              />
              <span className="hide-show-password" onClick={handleShowPass} style={{ cursor: "pointer" }}>
                <i className={`fa-solid ${isShowPassword === true ? "fa-eye" : "fa-eye-slash"}`}></i>
              </span>
            </div>
            <div className="sign-in-button col-12">
              <Loading isLoading={isLoading}>
                <button type="submit" className="btn btn-success col-12 mb-1">
                  <i className="fa-solid fa-right-to-bracket"></i> Đăng nhập
                </button>
              </Loading>
              <Link to="/">
                <button type="button" className="btn btn-outline-secondary col-12">
                  <i className="fa-solid fa-house"></i> Trang chủ
                </button>
              </Link>
            </div>
            <div className="other-options">
              <p className="sign-up-text">
                Chưa có tài khoản?
                <Link className="link-to-sign-up" to="/sign-up">
                  <span>Đăng ký</span>
                </Link>
              </p>

              <Link className="forgot-password-text">
                <p>Quên mật khẩu </p>
              </Link>
            </div>
            <div className="sign-in-with-social text-center">
              <div className="others-sign-in">
                <div className="others-sign-in-title">Hoặc đăng nhập với:</div>
                <div className="others-sign-in-social">
                  <i className="fa-brands fa-facebook"></i>
                  <i className="fa-brands fa-google-plus"></i>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;

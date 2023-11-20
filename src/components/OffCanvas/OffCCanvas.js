import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./OffCanvas.scss";
import * as utils from "../../utils";
import { resetUser } from "../../redux/slides/UserReducer";
function OffCanvas() {
  const [userData, setUserData] = useState({});
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setUserData(user);
  }, [user]);
  // user info
  const contentRight = () => {
    return (
      <div className="offcanvas-body-top-right-content">
        <div>
          <i className="fa-regular fa-user"></i> Tên: {userData && userData.firstName + " " + userData.lastName}
        </div>
        <div>
          <i className="fa-solid fa-venus-mars"></i> Giới tính: {userData && utils.genderUser(userData.gender)}
        </div>
        <div>
          <i className="fa-solid fa-phone-volume"></i> - {userData && userData.phoneNumber}
        </div>
        <div>
          <i className="fa-solid fa-location-dot"></i> Địa chỉ: {userData && userData.address}
        </div>
      </div>
    );
  };

  const redirectPage = (name) => {
    switch (name) {
      case "profile":
        navigate(`/user/profile-user/${userData.id}`);
        break;
      case "login":
        navigate("/sign-in");
        break;
      case "logout":
        handleLogOuttUser();
        break;
      case "manage":
        navigate("/system/admin-page");
        break;
      default:
        navigate("/");
        break;
    }
  };

  const contentPo = () => {
    return (
      <>
        {user && user.id ? (
          <div className="popover-content-button">
            <button
              data-bs-dismiss="offcanvas"
              type="button"
              className="btn"
              name="profile"
              onClick={() => redirectPage("profile")}
            >
              Thông tin về tôi
            </button>
            <br />
            <button
              data-bs-dismiss="offcanvas"
              type="button"
              className="btn"
              name="myOrder"
              onClick={() => redirectPage("myOrder")}
            >
              Đơn hàng của tôi
            </button>
            <br />
            <button
              data-bs-dismiss="offcanvas"
              type="button"
              className="btn"
              name="manage"
              onClick={() => redirectPage("manage")}
            >
              Quản lý hệ thống
            </button>
            <br />
            <button
              data-bs-dismiss="offcanvas"
              type="button"
              className="btn"
              name="logout"
              onClick={() => redirectPage("logout")}
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="popover-content-button">
            <button type="button" className="btn" name="login" onClick={() => redirectPage("logout")}>
              Đăng nhập
            </button>
          </div>
        )}
      </>
    );
  };

  // log out user
  const handleLogOuttUser = async () => {
    await utils.handleLogOut();
    dispatch(resetUser());
    navigate("/");
  };
  return (
    <>
      <div className="offcanvas  offcanvas-end" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
        <div className="offcanvas-header">
          <h5 id="offcanvasTopLabel">Thông tin</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="offcanvas-body-top">
            {userData && userData.id ? (
              <>
                <div className="offcanvas-body-top-left" style={{ backgroundImage: `url(${userData.image})` }}></div>
                <div className="offcanvas-body-top-right">{contentRight()}</div>
              </>
            ) : (
              <div className="text-uppercase">Vui lòng đăng nhập để sử dụng</div>
            )}
          </div>
          <div className="offcanvas-body-bottom container">{contentPo()}</div>
        </div>
      </div>
    </>
  );
}

export default OffCanvas;

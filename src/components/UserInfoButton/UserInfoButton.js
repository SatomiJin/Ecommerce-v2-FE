import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "./UserInfoButton.scss";
import OffCanvas from "../OffCanvas/OffCCanvas";
function UserInfoButton(props) {
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();
  let [userInfo, setUserInfo] = useState({
    userName: "",
    image: "",
    id: "",
  });
  const redirectCart = () => {
    if (user && user.id) {
      navigate("/cart-product");
    } else {
      navigate("/sign-in");
    }
  };
  const [isOpenPo, setIsOpenPo] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  //useEffect
  useEffect(() => {
    setIsLoading(!isLoading);
    if (user) {
      setUserInfo({
        userName: user.firstName + " " + user.lastName,
        image: user.image,
        id: user.id,
      });
      setIsLoading(!isLoading);
    }
  }, [props.userInfo]);
  return (
    <div className="user-info-button-container">
      <OffCanvas />
      <div className="user-info-button-content">
        <button
          onClick={redirectCart}
          className="user-info-button-cart btn btn-light  mx-1 position-relative"
          style={{ width: "3rem" }}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          {user && user.id && order && order.orderItems?.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {order.orderItems?.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          )}
        </button>

        {userInfo && userInfo.id !== "" ? (
          <>
            <button
              type="button"
              onClick={() => setIsOpenPo(!isOpenPo)}
              // style={{ width: "10rem" }}
              className="user-info-button-profile btn btn-light"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasTop"
              aria-controls="offcanvasTop"
            >
              {userInfo.image ? (
                <div
                  className="user-info-button-profile-image"
                  style={{ backgroundImage: `url(${userInfo.image})` }}
                ></div>
              ) : (
                <i className="fa-solid fa-user"></i>
              )}
              &nbsp;
              <span>{userInfo.userName}</span>
            </button>
          </>
        ) : (
          <Link to="/sign-in" style={{ textDecoration: "none" }}>
            <button type="button" className="user-info-button-profile btn btn-light">
              Đăng nhập
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default UserInfoButton;

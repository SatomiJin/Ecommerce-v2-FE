import { useNavigate } from "react-router-dom";
import InputSearch from "../InputSearch/InputSearch";
import UserInfoButton from "../UserInfoButton/UserInfoButton";
import "./Header.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({
    userName: "",
    avatar: "",
    id: "",
  });
  const backtohome = () => {
    navigate("/");
  };

  //useEffect
  useEffect(() => {
    if ((user && user.firstName) || user.lastName) {
      let name = `${user.firstName} ${user.lastName}`;
      setUserInfo({ userName: name, id: user.id });
    }
  }, [user]);

  return (
    <div className="header-container">
      <div className="header-wrapper container">
        <div className="header-content row">
          <div className="header-logo col-3">
            <div onClick={backtohome} style={{ cursor: "pointer" }} className="logo-page"></div>
          </div>

          <div className="header-search col-6">
            <InputSearch />
          </div>
          <div className="header-user col-3">
            <UserInfoButton userInfo={userInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

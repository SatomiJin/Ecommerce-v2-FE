import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./UserProfile.scss";
import * as UserService from "../../service/UserService";
import { useMutation, useMutationHook } from "../../hooks/useMutationHook";
import { useDispatch, useSelector } from "react-redux";
import * as utils from "../../utils";
import { updateUser } from "../../redux/slides/UserReducer";
import Loading from "../../components/Loading/Loading";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

function UserProfile() {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    gender: "",
    image: "",
    role: "",
  });
  const dispatch = useDispatch();
  const mutation = useMutationHook(async (data) => {
    let { access_token, userData } = data;
    let res = await UserService.updateUserInfo(userData, access_token);
    if (res && res.status === "OK") {
      dispatch(updateUser(userData));
    }
    return res;
  });
  let { isSuccess, isLoading, data } = mutation;
  //useEffect
  useEffect(() => {
    setUserData({
      email: user && user.email,
      firstName: user && user.firstName,
      lastName: user && user.lastName,
      address: user && user.address,
      phoneNumber: user && user.phoneNumber,
      gender: user && user.gender,
      image: user && user.image,
      role: user && user.roleId,
    });
  }, [user]);

  useEffect(() => {
    if (data && data.status === "OK" && isSuccess) {
      toast.success("Cập nhật thông tin thành công!!");
      handleGetDetailUser(user.id, user.access_token);
    }
    if (data && data.status === "ERROR") {
      toast.error("Cập nhật thông tin thất bại!!!");
    }
  }, [data, isSuccess]);
  //onChange
  const handleOnchange = (e) => {
    let copyState = { ...userData };
    copyState[e.target.name] = e.target.value;
    setUserData({ ...copyState });
  };
  const handleOnchangeImage = async (e) => {
    const data = e.target.files;
    const file = data[0];
    if (file) {
      const base64 = await utils.getBase64(file);
      setUserData({
        ...userData,
        image: base64,
      });
    }
  };
  //get  detail user
  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUserById(id, token);
    dispatch(updateUser({ ...res.data, access_token: token }));
  };
  console.log(userData);
  //update user
  const handleUpdateUser = async () => {
    mutation.mutate({ userData, access_token: user.access_token });
  };
  return (
    <>
      {isLoading === true && <LoadingPage />}

      <div className="profile-user-container">
        <div className="profile-user-title mx-2 text-uppercase text-center ">Thông tin người dùng</div>
        <div className="profile-user-info row p-3">
          <div className="profile-user-info-left col-6">
            {userData && userData.image ? (
              <div
                className="profile-user-info-left-avatar"
                style={{ backgroundImage: `url(${userData.image})` }}
              ></div>
            ) : (
              <div className="profile-user-info-left-avatar"></div>
            )}
            <button type="button" className="btn btn-danger">
              <label htmlFor="image" style={{ cursor: "pointer" }}>
                Đổi ảnh
              </label>
            </button>
          </div>
          <div className="profile-user-info-right col-6">
            <div>
              <i className="fa-solid fa-user"></i> Tên: {userData && userData.firstName + " " + userData.lastName}
            </div>
            <div>
              <i className="fa-solid fa-venus-mars"></i> Giới tính:
              {userData && userData.gender && utils.genderUser(userData.gender)}
            </div>
            <div>
              <i className="fa-solid fa-mobile"></i> - {userData && userData.phoneNumber}
            </div>
            <div>
              <i className="fa-solid fa-location-dot"></i> Địa chỉ: {userData && userData.address}
            </div>

            <div>
              <i className="fa-solid fa-circle-user"></i> Role: {userData && utils.roleUser(userData.role)}
            </div>
          </div>
        </div>

        <div className="profile-user-content">
          <form className="row">
            <div className="form-group">
              <label>Địa chỉ Email:</label>
              <input
                type="email"
                value={userData.email}
                className="form-control"
                disabled
                style={{ cursor: "not-allowed" }}
              />
            </div>
            <div className="form-group col-6">
              <label>Họ:</label>
              <input
                type="text"
                value={userData.firstName}
                onChange={(e) => handleOnchange(e)}
                name="firstName"
                className="form-control"
              />
            </div>
            <div className="form-group col-6">
              <label>Tên:</label>
              <input
                type="text"
                name="lastName"
                onChange={(e) => handleOnchange(e)}
                value={userData.lastName}
                className="form-control"
              />
            </div>
            <div className="form-group col-12">
              <label>Địa chỉ:</label>
              <input
                value={userData.address}
                onChange={(e) => handleOnchange(e)}
                type="text"
                className="form-control"
                name="address"
              />
            </div>
            <div className="form-group col-4">
              <label> Số điện thoại:</label>
              <input
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={(e) => handleOnchange(e)}
                className="form-control"
              />
            </div>
            <div className="form-group col-4">
              <label>Giới tính:</label>
              <select name="gender" value={userData.gender} onChange={(e) => handleOnchange(e)} className="form-select">
                <option value="M">Nam</option>
                <option value="F">Nữ</option>
                <option value="O">Khác</option>
              </select>
            </div>
            <div className="form-group col-4">
              <input type="file" id="image" hidden onChange={(e) => handleOnchangeImage(e)} name="image" />
              <button className="btn btn-info" type="button" style={{ padding: "0.5rem", marginTop: "1.6rem" }}>
                <label htmlFor="image" style={{ cursor: "pointer" }}>
                  Thêm ảnh
                </label>
              </button>
              {userData && userData.image && (
                <div className="profile-user-preview-image" style={{ backgroundImage: `url(${userData.image})` }}></div>
              )}
            </div>
            <div className="profile-user-button my-1">
              <button type="button" onClick={handleUpdateUser} className="btn btn-lg btn-outline-success">
                Cập nhật thông tin
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserProfile;

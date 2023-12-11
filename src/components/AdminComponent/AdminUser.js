import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./AdminUser.scss";
import * as UserService from "../../service/UserService";
import * as utils from "../../utils";
import UpdateModal from "./ModalUser/UpdateModal";
import CreateModal from "./ModalUser/CreateModal";
import DeleteModal from "./ModalUser/DeleteModal";
import Loading from "../Loading/Loading";
function AdminUser() {
  let user = useSelector((state) => state.user);
  let [isLoading, setIsLoading] = useState(false);
  let [detailUser, setDetailUser] = useState({});
  let [isUpdated, setIsUpdated] = useState(false);
  let [isDelete, setIsDelete] = useState(false);
  let [isCreated, setIsCreated] = useState(false);
  let [listUser, setListUser] = useState([]);
  let [deleteUserEmail, setDeleteEmail] = useState("");
  const handleUpdated = (status) => {
    setIsUpdated(status);
  };
  const handleDeleted = (status) => {
    setIsDelete(status);
  };
  const handleCreated = (status) => {
    setIsCreated(status);
  };
  const getAllUser = async () => {
    if (user && user.access_token) {
      setIsLoading(true);
      let res = await UserService.getAllUser(user.access_token);
      if (res && res.status === "OK") {
        setListUser(res.data);
        setIsLoading(false);
      }
      return res.data;
    }
  };

  const handleSetDataUserToModal = (item) => {
    setDetailUser(item);
  };

  const handleSelectUserDelete = (email) => {
    setDeleteEmail(email);
  };

  const handleDeleteUser = async () => {
    let res = await UserService.deleteUserByEmail(deleteUserEmail, user.access_token);

    if (res && res.status === "OK") {
      setIsLoading(true);
      setIsDelete(true);
      toast.success("Xóa người dùng thành công!!");
      await getAllUser();
      setIsLoading(false);
    } else {
      toast.error("Xóa người dùng thất bại");
    }
  };
  //useEffect
  useEffect(() => {
    setIsLoading(true);
    getAllUser();
    setIsLoading(false);
  }, []);
  useEffect(() => {
    if (isUpdated === true) {
      setIsLoading(true);
      getAllUser();
      setIsUpdated(false);
      setIsLoading(false);
    }
  }, [isUpdated]);

  useEffect(() => {
    if (isCreated === true) {
      getAllUser();
      setIsCreated(false);
    }
  }, [isCreated]);
  return (
    <>
      <div className="admin-user-container">
        <div className="admin-user-title text-uppercase text-center">Quản lý người dùng</div>
        <div className="admin-user-add-btn mx-4">
          <button data-bs-toggle="modal" data-bs-target="#createUser" type="button" className="btn">
            <i className="fa-solid fa-user-plus"></i> Thêm người dùng
          </button>
        </div>
        <Loading isLoading={isLoading}>
          <div className="admin-user-table">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Địa chỉ email</th>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Quyền</th>
                  <th scope="col">Giói tính</th>
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {listUser &&
                  listUser?.length > 0 &&
                  listUser.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.email}</td>
                        <td>{item.firstName + " " + item.lastName}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{utils.roleUser(item.roleId)}</td>
                        <td>{utils.genderUser(item.gender)}</td>
                        <td>
                          <div className="admin-user-table-btn">
                            <button
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteUser"
                              className="btn btn-outline-danger"
                              onClick={() => handleSelectUserDelete(item.email)}
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-info"
                              data-bs-toggle="modal"
                              data-bs-target="#updateUserModal"
                              onClick={() => handleSetDataUserToModal(item)}
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Loading>
      </div>
      <div className="admin-user-modal">
        <UpdateModal detailUser={detailUser} handleUpdated={handleUpdated} />
        <DeleteModal
          handleDeleted={handleDeleted}
          isDelete={isDelete}
          deleteUserEmail={deleteUserEmail}
          handleDeleteUser={handleDeleteUser}
        />
        <CreateModal handleCreated={handleCreated} />
      </div>
    </>
  );
}

export default AdminUser;

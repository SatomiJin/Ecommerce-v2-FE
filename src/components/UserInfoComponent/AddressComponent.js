import { useSelector } from "react-redux";
import "./AddressModal.scss";
function AddressComponent() {
  let user = useSelector((state) => state.user);

  return (
    <div className="address-component-container">
      <div className="cart-page-body-right-top row">
        <div className="title">Giao tới</div>
        <div className="user-info ">
          <div className="name text-center">{user && user.firstName + " " + user.lastName}</div>
          <div className="phone text-center">{user && user.phoneNumber}</div>
        </div>
        <div className="address">
          <button className="btn mx-2" data-bs-toggle="modal" data-bs-target="#addressModal">
            Nhà
          </button>
          {user && user.address}
        </div>
      </div>
    </div>
  );
}

export default AddressComponent;

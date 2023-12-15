// import { resetUser } from "./redux/slides/UserReducer";
import { persistor } from "./redux/store";

export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }
  return true;
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const roleUser = (role) => {
  let roleUser = "";
  if (role === "R1") {
    roleUser = "ADMIN";
  }
  if (role === "R3") {
    roleUser = "Khách hàng";
  }
  if (role === "R2") {
    roleUser = "Của hàng";
  }
  return roleUser;
};

export const genderUser = (gender) => {
  let userGender = "";
  if (gender === "M") userGender = "Nam";
  if (gender === "F") userGender = "Nữ";
  if (gender === "O") userGender = "Khác";
  return userGender;
};

export const renderAllType = (list) => {
  let result = [];

  if (list) {
    result = list.map((type) => {
      return {
        value: type.type,
        label: type.type,
      };
    });
  }
  result.push({
    value: "ADD_TYPE",
    label: "Thêm loại",
  });

  return result;
};

//logout
export const handleLogOut = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  persistor.pause();
  persistor.flush().then(() => {
    return persistor.purge();
  });
};

export const formattedPrice = (price) => {
  let result = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
  return result;
};

//status
export const deliveryStatus = (status) => {
  let result = "";
  switch (status) {
    case "S1":
      result = "Chờ xác nhận";
      break;
    case "S2":
      result = "Đang vận chuyển";
      break;
    case "S3":
      result = "Đã nhận hàng";
      break;
    default:
      result = "";
  }
  return result;
};

export const paymentStatus = (status) => {
  let result = "";
  switch (status) {
    case "P1":
      result = "Chưa thanh toán";
      break;
    case "P2":
      result = "Đã thanh toán";
      break;
    default:
      result = "";
  }
  return result;
};

export const capitalizeFirstLetter = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const initFacebookSDK = () => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }

  window.fbAsyncInit = function () {
    window.FB.init({
      appId: process.env.REACT_APP_APP_ID,
      cookie: true, // enable cookies to allow the server to access
      // the session
      xfbml: true, // parse social plugins on this page
      version: "v18.0", // use version 2.1
    });
  };
  // Load the SDK asynchronously
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `//connect.facebook.net/vi_VN/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};

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

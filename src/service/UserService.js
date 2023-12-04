import axios from "axios";

export const axiosJWT = axios.create();

export const signInUser = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_KEY}user/sign-in`, data);
  return res.data;
};
export const signUpUser = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_KEY}user/sign-up`, data);
  return res.data;
};

export const getDetailUserById = async (data, access_token) => {
  let res = await axios.get(`${process.env.REACT_APP_API_KEY}user/get-detail-user/${data.id}`, {
    headers: {
      token: `Bearer ${access_token}`,
      email: data.email,
    },
  });

  return res.data;
};

///refresh token
export const refreshToken = async (refreshToken) => {
  let res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/refresh-token`, {
    headers: {
      token: `Bearer ${refreshToken}`,
    },
  });
  return res.data;
};

export const updateUserInfo = async (data, access_token) => {
  // update - user - info;

  let res = await axios.put(`${process.env.REACT_APP_API_KEY}user/update-user-info`, data, {
    headers: {
      token: `Bearer ${access_token}`,
      email: data.email,
    },
  });
  return res.data;
};

export const getAllUser = async (access_token) => {
  let res = await axios.get(`${process.env.REACT_APP_API_KEY}user/get-all-user`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });

  return res.data;
};

//delete user by email
export const deleteUserByEmail = async (email, access_token) => {
  let res = await await axios.delete(`${process.env.REACT_APP_API_KEY}user/delete-user?email=${email}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

import axios from "axios";

export const createOrder = async (access_token, data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_KEY}order/create-order`, data, {
    headers: {
      token: `Bearer ${access_token}`,
      email: data.email,
    },
  });
  return res.data;
};

export const getAllMyOrder = async (access_token, userId, email) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}order/get-all-my-order?userId=${userId}`, {
    headers: {
      token: `Bearer ${access_token}`,
      email: email,
    },
  });

  return res.data;
};

export const getDetailOrder = async (access_token, orderId, email) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}order/get-order-detail?orderId=${orderId}`, {
    headers: {
      token: `Bearer ${access_token}`,
      email: email,
    },
  });
  return res.data;
};

export const confirmOrder = async (access_token, orderId, email) => {
  const res = await axios.put(`${process.env.REACT_APP_API_KEY}order/confirm-order?orderId=${orderId}`, email, {
    headers: {
      token: `Bearer ${access_token}`,
      email: email,
    },
  });
  return res.data;
};

export const receivedOrder = async (access_token, orderId, email) => {
  let res = await axios.put(`${process.env.REACT_APP_API_KEY}order/received-order?orderId=${orderId}`, email, {
    headers: {
      token: `Bearer ${access_token}`,
      email: email,
    },
  });

  return res.data;
};

export const getAllOrder = async (access_token) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}order/get-all-order`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteOrderById = async (access_token, orderId) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_KEY}order/delete-order-by-id?orderId=${orderId}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

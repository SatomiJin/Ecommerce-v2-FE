import axios from "axios";

export const getAllProduct = async (data) => {
  let res = {};

  if (!data.limit) data.limit = 6;
  if (!data.page) data.page = 0;
  if (data.search?.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_KEY}product/get-all-product?filter=${data.search}&limit=${data.limit}&page=${data.page}`
    );
  } else {
    res = await axios.get(
      `${process.env.REACT_APP_API_KEY}product/get-all-product?limit=${data.limit || 6}&page=${data.page || 0}`
    );
  }

  return res.data;
};

export const createNewProduct = async (data, access_token) => {
  const res = await axios.post(`${process.env.REACT_APP_API_KEY}product/create-new-product`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getDetailProduct = async (name) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}product/get-detail-product?productName=${name}`);
  return res.data;
};

export const getAllTypeProduct = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}product/get-all-type`);
  return res.data;
};

export const deleteProduct = async (productName, access_token) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_KEY}product/delete-product?productName=${productName}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

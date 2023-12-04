import axios from "axios";

export const getConfigPayPal = async () => {
  let res = await axios.get(`${process.env.REACT_APP_API_KEY}payment/paypal`);
  return res.data;
};

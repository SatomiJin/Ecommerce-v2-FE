import { createSlice } from "@reduxjs/toolkit";
import * as constant from "../../constant";

let delivery = constant.orderOptions.delivery;
let payment = constant.orderOptions.payment;

const initialState = {
  userId: "",
  orderItems: [],
  orderItemsSelected: [],
  shippingAddress: "",
  paymentMethod: {},
  methodShipping: {},
  shippingPrice: 0,
  totalPrice: 0,
  discountPrice: 0,
  provisionalPrice: 0,
  isPaid: "P1",
  status: "S1",
  isSuccessOrder: false,
};

export const orderSlide = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem, userId } = action.payload;
      const itemOrder = state && state.orderItems.find((item) => item && item.name === orderItem.name);
      state.userId = userId;
      if (itemOrder) {
        if (itemOrder.amount <= itemOrder.countInStock) {
          itemOrder.amount += orderItem && orderItem.amount;
          state.isSuccessOrder = true;
        }
      } else {
        state.orderItems.push(orderItem);
      }
    },
    resetOrder: (state) => {
      state.isSuccessOrder = false;
    },
    increaseAmount: (state, action) => {
      const { name } = action.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.name === name);
      const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.name === name);
      itemOrder.amount++;
      if (itemOrderSelected) {
        itemOrderSelected.amount++;
      }
    },
    decreaseAmount: (state, action) => {
      const { name } = action.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.name === name);
      const itemOrderSelected = state?.orderItems?.orderItemsSelected?.find((item) => item?.name === name);
      itemOrder.amount--;
      if (itemOrderSelected) {
        itemOrderSelected.amount--;
      }
    },
    removeProductOrder: (state, action) => {
      const { name } = action.payload;
      const itemOrder = state?.orderItems?.filter((item) => item.name !== name);
      const itemOrderSelected = state?.orderItemsSelected?.filter((item) => item.name !== name);

      state.orderItems = itemOrder;
      state.orderItemsSelected = itemOrderSelected;
    },
    removeAllProductOrder: (state, action) => {
      const { listChecked } = action.payload;
      const itemOrders = state?.orderItems?.filter((item) => !listChecked?.includes(item.name));
      const itemsOrderSelected = state?.orderItemsSelected?.filter((item) => !listChecked?.includes(item.name));

      state.orderItems = itemOrders;
      state.orderItemsSelected = itemsOrderSelected;
    },
    selectedOrder: (state, action) => {
      const { listChecked, priceOrder } = action.payload;
      const orderSelected = [];
      state.orderItems.forEach((item) => {
        if (listChecked?.includes(item.name)) {
          orderSelected.push(item);
        }
      });
      state.orderItemsSelected = orderSelected;
      state.totalPrice = priceOrder?.totalPrice;
      state.provisionalPrice = priceOrder?.priceMemo;
      state.discountPrice = priceOrder?.discount;
    },
    shippingPrice: (state, action) => {
      let { methodShipping } = action.payload;
      // eslint-disable-next-line array-callback-return
      delivery.map((item) => {
        if (methodShipping === item.value) {
          state.methodShipping = item;
        }
      });
      if (methodShipping === "save") state.shippingPrice = 10000;
      if (methodShipping === "train") state.shippingPrice = 30000;
      if (methodShipping === "fast") state.shippingPrice = 20000;
    },
    choosePaymentMethod: (state, action) => {
      let { paymentOption } = action.payload;
      // eslint-disable-next-line array-callback-return
      payment.map((item) => {
        if (paymentOption === item.value) {
          state.paymentMethod = item;
        }
      });
    },
  },
});

export const {
  addOrderProduct,
  resetOrder,
  increaseAmount,
  decreaseAmount,
  removeProductOrder,
  removeAllProductOrder,
  selectedOrder,
  shippingPrice,
  choosePaymentMethod,
} = orderSlide.actions;

export default orderSlide.reducer;

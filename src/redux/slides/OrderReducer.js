import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  orderItems: [],
  shippingAddress: "",
  paymentMethod: "",
  shippingPrice: 0,
  totalPrice: 0,
  isPaid: "P1",
  status: "S1",
  isSuccessOrder: false,
};

export const orderSlide = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state && state.orderItems.find((item) => item && item.product === orderItem.product);
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
  },
});

export const { addOrderProduct, resetOrder } = orderSlide.actions;

export default orderSlide.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastName: "",
  firstName: "",
  email: "",
  phoneNumber: "",
  address: "",
  image: "",
  access_token: "",
  id: "",
  roleId: "R3",
  refreshToken: "",
  gender: "",
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        firstName = "",
        lastName = "",
        email = "",
        access_token = "",
        address = "",
        phoneNumber = "",
        gender = "",
        image = "",
        id = "",
        roleId = "R3",
        refreshToken = "",
      } = action.payload;
      state.firstName = firstName ? firstName : state.firstName;
      state.lastName = lastName ? lastName : state.lastName;
      state.gender = gender ? gender : state.gender;
      state.email = email ? email : state.email;
      state.address = address ? address : state.address;
      state.phoneNumber = phoneNumber ? phoneNumber : state.phone;
      state.image = image ? image : state.image;
      state.id = id ? id : state.id;
      state.access_token = access_token ? access_token : state.access_token;
      state.roleId = roleId ? roleId : state.roleId;
      state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
    },
    resetUser: (state) => {
      state.firstName = "";
      state.firstName = "";
      state.email = "";
      state.address = "";
      state.phoneNumber = "";
      state.image = "";
      state.id = "";
      state.access_token = "";
      state.roleId = "";
      state.refreshToken = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;

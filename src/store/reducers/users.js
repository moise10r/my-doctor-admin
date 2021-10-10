import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";

const slice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    usersRequested: (users) => {
      users.loading = true;
      users.error = null;
    },
    usersReceived: (users, action) => {
      users.list = action.payload;
      users.loading = false;
      users.error = null;
    },
    usersRequestFailed: (users, action) => {
      users.error = action.payload;
      users.loading = false;
    },
    userDeleted: (users, action) => {
      users.list = users.list.filter((user) => user.id !== action.payload);
      users.loading = false;
    },
    userDeletionFailed: (users, action) => {
      users.error = action.payload;
      users.loading = false;
    },

    userInfoUpdated: (users, action) => {
      const index = users.list.findIndex(
        (user) => user.id === action.payload.id
      );
      users.list[index] = action.payload;
      users.loading = false;
    },

    userInfoUpdateFailed: (users, action) => {
      users.error = action.payload;
      users.loading = false;
    },
  },
});

export default slice.reducer;
const {
  usersReceived,
  userDeleted,
  userDeletionFailed,
  usersRequestFailed,
  usersRequested,
  userInfoUpdateFailed,
  userInfoUpdated,
} = slice.actions;

export const loadUsers = () => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: usersRequested.type,
      onError: usersRequestFailed.type,
      onSuccess: usersReceived.type,
      url: "/users",
      method: "GET",
    })
  );
};

export const deleteUser = (id) => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: usersRequested.type,
      onError: userDeletionFailed.type,
      onSuccess: userDeleted.type,
      url: `/users/${id}`,
      method: "DELETE",
    })
  );
};

export const updateUserInfo = (id, data) => (dispatch) => {
  console.log(data);
  dispatch(
    actions.apiCallBegan({
      onStart: usersRequested.type,
      onError: userInfoUpdateFailed.type,
      onSuccess: userInfoUpdated.type,
      url: `/users/${id}`,
      method: "PUT",
      data: {
        name: data.name,
        email: data.email,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        age: data.age,
        status: data.status,
        gender: data.gender,
        country: data.country,
        city: data.city,
        streetNumber: data.streetNumber,
        kitIdentifier: data.kitIdentifier,
        profileImage: data.profileImage,
      },
    })
  );
};

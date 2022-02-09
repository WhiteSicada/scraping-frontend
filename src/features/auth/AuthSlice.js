import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { fetchCount } from './counterAPI';

const initialState = {
  status: null,
  user: {},
  isLoggedIn: false,
};

const AUTH_URL = "http://localhost:8081/api/auth/signin";
const AUTH_GET_PROFILE = "http://localhost:8081/api/auth/me";
const AUTH_UPDATE_USER = "http://localhost:8081/api/auth/user/";

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (userObject, { dispatch }) => {
    const { data } = await axios.post(AUTH_URL, userObject);
    console.log(JSON.stringify(userObject, null, 2));
    localStorage.setItem("jwtToken", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: data.id,
        username: data.username,
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        dateBirth: data.dateBirth,
        roles: data.roles,
      })
    );
    return data;
  }
);
export const getProfile = createAsyncThunk("auth/getProfile", async () => {
  const token = localStorage.getItem("jwtToken");
  const { data } = await axios.get(AUTH_GET_PROFILE, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
});
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (oldUser, { dispatch }) => {
    const token = localStorage.getItem("jwtToken");
    axios
      .patch(AUTH_UPDATE_USER + oldUser.id, oldUser.oldUser, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => dispatch(modifyUser(oldUser)));
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
      state.isLoggedIn = false;
    },
    modifyUser: (state, { payload }) => {
      state.user = { ...state.user, ...payload.oldUser };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authenticateUser.fulfilled, (state, { payload }) => {
        console.log(JSON.stringify(payload, null, 2));
        state.user = payload;
        state.isLoggedIn = true;
        state.status = "idle";
      })
      .addCase(authenticateUser.rejected, (state, { payload }) => {
        console.log(JSON.stringify(payload, null, 2));
        state.status = "failed";
      })
      .addCase(getProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = "idle";
      })
      .addCase(getProfile.rejected, (state, { payload }) => {
        console.log(JSON.stringify(payload, null, 2));
        state.status = "failed";
      });
  },
});

export const { modifyUser, setNewUser, logoutUser } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  clients: [],
  status: null,
};
const GET_CLIENTS = "http://localhost:8081/rest/clients";
const CREATE_USER = "http://localhost:8081/auth/register";
const DELETE_USER = "http://localhost:8081/auth/users/";
const AUTH_UPDATE_USER = "http://localhost:8081/auth/user/";

export const getClients = createAsyncThunk("clients/getClients", async () => {
  //   const token = localStorage.getItem("jwtToken");
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return data;
});

export const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClients.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.clients = payload;
      })
      .addCase(getClients.rejected, (state, { payload }) => {
        state.status = "failed";
      });
  },
});

// export const { addUser, ModifyUser, DeleteUser } = clientSlice.actions;

export const selectClients = (state) => state.clients.clients;

export default clientSlice.reducer;

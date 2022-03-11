import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../hooks/authHeader";

const initialState = {
	users: [],
	status: null,
};
const GET_USERS = "http://localhost:8081/api/auth/users";
const CREATE_USER = "http://localhost:8081/api/auth/signup";
const DELETE_USER = "http://localhost:8081/api/auth/users/";
const AUTH_UPDATE_USER = "http://localhost:8081/api/auth/user/";

// export const getUsers = createAsyncThunk("users/getUsers", async () => {
//   const res = await axios.get("https://jsonplaceholder.typicode.com/users");
//   return res.data;
// });

export const createUser = createAsyncThunk("users/createUser", async (user) => {
	const { data } = await axios.post(CREATE_USER, user, {
		headers: authHeader(),
	});
	return data;
});

export const getUsers = createAsyncThunk("users/getUsers", async () => {
	const { data } = await axios.get(GET_USERS, { headers: authHeader() });
	return data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
	await axios.delete(DELETE_USER + id, { headers: authHeader() });
	return { id };
});

export const updateUser = createAsyncThunk(
	"users/updateUser",
	async ({ oldUser, id }, { dispatch }) => {
		const token = localStorage.getItem("jwtToken");
		axios.patch(AUTH_UPDATE_USER + id, oldUser, { headers: authHeader() });
		return { oldUser, id };
	}
);

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getUsers.fulfilled, (state, { payload }) => {
				state.status = "success";
				state.users = payload;
			})
			.addCase(getUsers.rejected, (state, { payload }) => {
				state.status = "failed";
			})
			.addCase(createUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createUser.fulfilled, (state, { payload }) => {
				state.status = "success";
				state.users.push(payload);
			})
			.addCase(createUser.rejected, (state, { payload }) => {
				state.status = "failed";
			})
			.addCase(deleteUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteUser.fulfilled, (state, { payload }) => {
				state.status = "success";
				state.users = state.users.filter((user) => user.id !== payload.id);
			})
			.addCase(deleteUser.rejected, (state, { payload }) => {
				state.status = "failed";
			})
			.addCase(updateUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateUser.fulfilled, (state, { payload }) => {
				state.status = "success";
				const index = state.users.findIndex((user) => user.id === payload.id);
				state.users[index] = {
					...state[index],
					...payload.oldUser,
				};
			})
			.addCase(updateUser.rejected, (state, { payload }) => {
				state.status = "failed";
			});
	},
});

export const { addUser, ModifyUser, DeleteUser } = userSlice.actions;

export const selectUsers = (state) => state.users.users;

export default userSlice.reducer;

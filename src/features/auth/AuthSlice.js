import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../hooks/authHeader";
import myAxios from "../../hooks/axiosConfig";

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
	async (userObject, { dispatch, rejectWithValue }) => {
		try {
			const { data } = await axios.post(AUTH_URL, userObject);
			if (data.token) {
				localStorage.setItem("user", JSON.stringify(data));
			}
			return await data;
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);
export const getProfile = createAsyncThunk("auth/getProfile", async () => {
	console.log("HHHHHHHHHHHHHHHHHHHH");
	const { data } = await axios.get(AUTH_GET_PROFILE, {
		headers: authHeader(),
	});
	return data;
});
export const updateUser = createAsyncThunk(
	"auth/updateUser",
	async (oldUser, { dispatch, rejectWithValue }) => {
		try {
			axios
				.patch(AUTH_UPDATE_USER + oldUser.id, oldUser.oldUser, {
					headers: authHeader(),
				})
				.then((res) => dispatch(modifyUser(oldUser)));
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

export const logoutUser = () => {
	localStorage.removeItem("user");
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
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
				state.user = payload;
				state.status = "idle";
			})
			.addCase(authenticateUser.rejected, (state, { payload }) => {
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

export const { modifyUser, setNewUser } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;

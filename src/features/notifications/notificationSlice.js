import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	notification: {
		isOpen: false,
		message: "",
		type: "",
	},
};

export const notificationSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		setSuccessNotification: (state, { payload }) => {
			state.notification = {
				isOpen: true,
				message: payload,
				type: "success",
			};
		},
		setErrorNotification: (state, { payload }) => {
			state.notification = {
				isOpen: true,
				message: payload,
				type: "error",
			};
		},
		closeNotification: (state, { payload }) => {
			state.notification = {
				isOpen: false,
				message: payload || "",
				type: "success",
			};
		},
	},
});

export const {
	setSuccessNotification,
	setErrorNotification,
	closeNotification,
} = notificationSlice.actions;

export const selectNotification = (state) => state.notifications.notification;

export default notificationSlice.reducer;

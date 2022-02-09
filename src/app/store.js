import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/UserSlice";
import authReducer from "../features/auth/AuthSlice";
import clientsReducer from "../features/clients/ClientsSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    clients: clientsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

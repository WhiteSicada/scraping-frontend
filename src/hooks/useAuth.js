import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/AuthSlice";

function useAuth() {
  return useSelector(selectUser);
}

export default useAuth;

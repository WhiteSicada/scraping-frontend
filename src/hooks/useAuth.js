import React from "react";

function useAuth() {
	const user = JSON.parse(localStorage.getItem("user"));
	return user && user.token ? user : null;
}

export default useAuth;

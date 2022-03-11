import myAxios from "../hooks/axiosConfig";
import axios from "axios";

const AUTH_URL = "http://localhost:8081/api/auth/signin";

const BASE_URL = "/api/auth/";
const GET_PROFILE = "/api/auth/me";

const UPDATE_USER = BASE_URL + "users";

class AuthService {
	authenticate(request) {
		return axios.post(AUTH_URL, request);
	}

	getProfile() {
		return myAxios.get(GET_PROFILE);
	}

	// getUsers() {
	// 	return myAxios.get(GET_USERS);
	// }

	// createUser(user) {
	// 	return myAxios.post(CREATE_USERS, user);
	// }

	// deleteUser(id) {
	// 	myAxios.delete(DELETE_USERS + id);
	// }

	// getAllRoutesByBackendLegacySystem(backend_system, page) {
	// 	return myAxios.get(
	// 		BASE_URL + "/all/" + backend_system + "?size=9&page=" + page
	// 	);
	// }

	// createRoute(route) {
	// 	return myAxios.post(BASE_URL, route);
	// }
}

export default new AuthService();

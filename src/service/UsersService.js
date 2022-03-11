import myAxios from "../hooks/axiosConfig";
import axios from "axios";

const CREATE_USER = "/api/auth/signup";
const GET_USERS = "/api/auth/users";


class UsersService {
	createUser(user) {
		return myAxios.post(CREATE_USER, user);
	}

	getUsers() {
		return myAxios.get(GET_USERS);
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

export default new UsersService();
// export const authenticateUser = createAsyncThunk(
// 	"auth/authenticateUser",
// 	async (request, { dispatch, rejectWithValue }) => {
// 		try {
// 			const { data } = await AuthService.authenticate(request);
// 			console.log(JSON.stringify(data, null, 2));
// 			if (data.token) {
// 				localStorage.setItem("user", JSON.stringify(data));
// 			}
// 			return await data;
// 		} catch (error) {
// 			return rejectWithValue(error.response.data.error);
// 		}
// 	}
// );
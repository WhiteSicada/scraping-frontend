import myAxios from "../hooks/axiosConfig";
import {
	CREATE_CLIENT,
	CREATE_CONJOINT,
	DELETE_CLIENT,
	GET_CLIENTS,
	UPDATE_CLIENT,
	UPDATE_CONJOINT,
	CREATE_ENFANT,
	UPDATE_ENFANT,
	DELETE_ENFANT,
	TARIFIER_CLIENT,
	CREATE_ADRESS,
	UPDATE_ADRESS,
} from "./paths";

class ClientService {
	// ################################ CRUD Client ################################
	getAllClients() {
		return myAxios.get(GET_CLIENTS);
	}
	createClient(client) {
		return myAxios.post(CREATE_CLIENT, client);
	}
	updateClient(client) {
		return myAxios.put(UPDATE_CLIENT + client.id, client);
	}
	deleteClient(id) {
		myAxios.delete(DELETE_CLIENT + id);
	}

	// ################################ CU conojint ################################

	createConjoint({ id, conjoint }) {
		return myAxios.post(CREATE_CONJOINT(id), conjoint);
	}
	updateConjoint(conjoint) {
		return myAxios.put(UPDATE_CONJOINT + conjoint.data.id, conjoint.data);
	}

	// ################################ CU adress ################################

	createAdress({ id, adress }) {
		return myAxios.post(CREATE_ADRESS(id), adress);
	}
	updateAdress(adress) {
		return myAxios.put(UPDATE_ADRESS + adress.data.id, adress.data);
	}

	// ################################ CUD Enfants ################################

	createEnfant(request) {
		return myAxios.post(CREATE_ENFANT(request.clientId), request.data);
	}
	updateEnfant(request) {
		return myAxios.put(
			UPDATE_ENFANT(request.clientId, request.enfantId),
			request.data
		);
	}
	deleteEnfant(request) {
		myAxios.delete(DELETE_ENFANT(request.clientId, request.enfantId));
	}

	// ################################ tarification ################################

	tarifierClient(id) {
		return myAxios.get(TARIFIER_CLIENT(id));
	}
}

export default new ClientService();

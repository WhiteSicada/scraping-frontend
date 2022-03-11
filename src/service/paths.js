// ################################ CRUD Client ################################
export const GET_CLIENTS = "/api/clients";
export const CREATE_CLIENT = "/api/clients";
export const UPDATE_CLIENT = "/api/clients/";
export const DELETE_CLIENT = "/api/clients/";

// ################################ Create update conjoint ################################

export const CREATE_CONJOINT = (clientId) => {
	return "/api/clients/" + clientId + "/conjoint";
};
export const UPDATE_CONJOINT = "/api/conjoint/";

// ################################ Create update adress ################################

export const CREATE_ADRESS = (clientId) => {
	return "/api/clients/" + clientId + "/adress";
};
export const UPDATE_ADRESS = "/api/adresses/";

// ################################ CUD enfant ################################

export const CREATE_ENFANT = (clientId) => {
	return "/api/clients/" + clientId + "/enfants";
};
export const UPDATE_ENFANT = (clientId, enfantId) => {
	return "/api/clients/" + clientId + "/enfants/" + enfantId;
};
export const DELETE_ENFANT = (clientId, enfantId) => {
	return "/api/clients/" + clientId + "/enfants/" + enfantId;
};

export const TARIFIER_CLIENT = (clientId) => {
	return "/api/clients/" + clientId + "/tarification";
};

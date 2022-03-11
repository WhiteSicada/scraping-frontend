import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClientService from "../../service/ClientService";

const initialState = {
	clients: [],
	clientToEdit: null,
	conjointToEdit: null,
	adressToEdit: null,
	enfantToEdit: null,
};

// ################################ CRUD Client ################################

export const getClients = createAsyncThunk("clients/getClients", async () => {
	const { data } = await ClientService.getAllClients();
	return data;
});

export const createClient = createAsyncThunk(
	"clients/createClient",
	async (client) => {
		const { data } = await ClientService.createClient(client);
		return data;
	}
);

export const updateClient = createAsyncThunk(
	"clients/updateClient",
	async (client) => {
		const { data } = await ClientService.updateClient(client);
		return data;
	}
);

export const deleteClient = createAsyncThunk(
	"clients/deleteClient",
	async (id) => {
		await ClientService.deleteClient(id);
		return { id };
	}
);

// ################################ Create Update Conjoint ################################

export const createConjoint = createAsyncThunk(
	"clients/createConjoint",
	async (request) => {
		console.log(JSON.stringify(request, null, 2));
		const { data } = await ClientService.createConjoint(request);
		return { id: request.id, data: data };
	}
);

export const updateConjoint = createAsyncThunk(
	"clients/updateConjoint",
	async (client) => {
		const { data } = await ClientService.updateConjoint(client);
		return { clientId: client.clientId, data: data };
	}
);

// ################################ Create Update Adress ################################

export const createAdress = createAsyncThunk(
	"clients/createAdress",
	async (request) => {
		const { data } = await ClientService.createAdress(request);
		return { id: request.id, data: data };
	}
);

export const updateAdress = createAsyncThunk(
	"clients/updateAdress",
	async (request) => {
		const { data } = await ClientService.updateAdress(request);
		return { clientId: request.clientId, data: data };
	}
);

// ################################ CUD Enfant ################################

export const createEnfant = createAsyncThunk(
	"clients/createEnfant",
	async (request) => {
		const { data } = await ClientService.createEnfant(request);
		return {
			clientId: request.clientId,
			data: data,
		};
	}
);

export const updateEnfant = createAsyncThunk(
	"clients/updateEnfant",
	async (request) => {
		const { data } = await ClientService.updateEnfant(request);
		return {
			clientId: request.clientId,
			enfantId: request.enfantId,
			data: data,
		};
	}
);

export const deleteEnfant = createAsyncThunk(
	"clients/deleteEnfant",
	async (request) => {
		await ClientService.deleteEnfant(request);
		return {
			clientId: request.clientId,
			enfantId: request.enfantId,
		};
	}
);

// ################################ tarification client ################################

export const tarifierClient = createAsyncThunk(
	"clients/tarifierClient",
	async (id) => {
		const { data } = await ClientService.tarifierClient(id);
		return data;
	}
);

export const clientSlice = createSlice({
	name: "clients",
	initialState,
	reducers: {
		sClientToEdit: (state, { payload }) => {
			state.clientToEdit = payload;
		},
		sConjointToEdit: (state, { payload }) => {
			state.conjointToEdit = payload;
		},
		sEnfantToEdit: (state, { payload }) => {
			state.enfantToEdit = payload;
		},
		sAdressToEdit: (state, { payload }) => {
			state.adressToEdit = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getClients.fulfilled, (state, { payload }) => {
				state.clients = payload;
			})
			.addCase(createClient.fulfilled, (state, { payload }) => {
				state.clients.push(payload);
			})
			.addCase(updateClient.fulfilled, (state, { payload }) => {
				const index = state.clients.findIndex(
					(client) => client.id === payload.id
				);
				state.clients[index] = {
					...state.clients[index],
					...payload,
				};
			})
			.addCase(deleteClient.fulfilled, (state, { payload }) => {
				state.clients = state.clients.filter(
					(client) => client.id !== payload.id
				);
			})
			.addCase(createConjoint.fulfilled, (state, { payload }) => {
				const index = state.clients.findIndex(
					(client) => client.id === payload.id
				);
				state.clients[index].conjoint = payload.data;
				state.clientToEdit = null;
				state.conjointToEdit = null;
			})
			.addCase(createConjoint.rejected, (state, { payload }) => {
				state.clientToEdit = null;
				state.conjointToEdit = null;
			})
			.addCase(updateConjoint.fulfilled, (state, { payload }) => {
				console.log("payload.clientId " + payload.clientId);
				const index = state.clients.findIndex(
					(client) => client.id === payload.clientId
				);

				state.clients[index].conjoint = payload.data;
				state.clientToEdit = null;
				state.conjointToEdit = null;
			})
			.addCase(updateConjoint.rejected, (state, { payload }) => {
				state.clientToEdit = null;
				state.conjointToEdit = null;
			})
			.addCase(createAdress.fulfilled, (state, { payload }) => {
				const index = state.clients.findIndex(
					(client) => client.id === payload.id
				);
				state.clients[index].adress = payload.data;
				state.clientToEdit = null;
				state.adressToEdit = null;
			})
			.addCase(createAdress.rejected, (state, { payload }) => {
				state.clientToEdit = null;
				state.adressToEdit = null;
			})
			.addCase(updateAdress.fulfilled, (state, { payload }) => {
				const index = state.clients.findIndex(
					(client) => client.id === payload.clientId
				);

				state.clients[index].adress = payload.data;
				state.clientToEdit = null;
				state.adressToEdit = null;
			})
			.addCase(updateAdress.rejected, (state, { payload }) => {
				state.clientToEdit = null;
				state.adressToEdit = null;
			})
			.addCase(createEnfant.fulfilled, (state, { payload }) => {
				const index = state.clients.findIndex(
					(client) => client.id === payload.clientId
				);
				state.clients[index].enfantList.push(payload.data);
				state.clientToEdit.enfantList.push(payload.data);
				state.enfantToEdit = null;
			})
			.addCase(createEnfant.rejected, (state, { payload }) => {
				state.clientToEdit = null;
				state.enfantToEdit = null;
			})
			.addCase(updateEnfant.fulfilled, (state, { payload }) => {
				state.clients = state.clients.map((client) => {
					if (client.id === payload.clientId) {
						var newEnfantList = client.enfantList.map((enfant) => {
							if (enfant.id === payload.enfantId) {
								enfant = payload.data;
							}
							return enfant;
						});
						client.enfantList = newEnfantList;
						state.clientToEdit.enfantList = newEnfantList;
					}
					return client;
				});
				state.enfantToEdit = null;
			})
			.addCase(updateEnfant.rejected, (state, { payload }) => {
				state.clientToEdit = null;
				state.enfantToEdit = null;
			})
			.addCase(deleteEnfant.fulfilled, (state, { payload }) => {
				state.clients = state.clients.map((client) => {
					if (client.id === payload.clientId) {
						var newEnfantList = client.enfantList.filter(
							(enfant) => enfant.id !== payload.enfantId
						);
						client.enfantList = newEnfantList;
						state.clientToEdit.enfantList = newEnfantList;
					}
					return client;
				});
				state.enfantToEdit = null;
			})
			.addCase(deleteEnfant.rejected, (state, { payload }) => {
				state.clientToEdit = null;
				state.enfantToEdit = null;
			});
	},
});

export const { sClientToEdit, sConjointToEdit, sEnfantToEdit, sAdressToEdit } =
	clientSlice.actions;

export const selectClients = (state) => state.clients.clients;
export const selectClientToEdit = (state) => state.clients.clientToEdit;
export const selectConjointToEdit = (state) => state.clients.conjointToEdit;
export const selectEnfantToEdit = (state) => state.clients.enfantToEdit;
export const selectAdressToEdit = (state) => state.clients.adressToEdit;

export default clientSlice.reducer;

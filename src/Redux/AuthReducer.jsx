import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MyAxios from "../Interceptor/MyAxios";

// Action Reducer

export const login = createAsyncThunk("auth/login", async (data) => {
	const response = await MyAxios.post("/auth/connexion", data);
	return response;
});

export const getUser = createAsyncThunk("auth/getUser", async (id) => {
	const response = await MyAxios.get(`/user/${id}`);
	return response;
});

export const register = createAsyncThunk("auth/register", async (data) => {
	const response = await MyAxios.post("/auth/inscription", data);
	if (!response.ok) {
		throw new Error(response.message || "Could not authenticate you.");
	}
	return response;
});

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
	const response = await MyAxios.post("/auth/refresh-token");
	return response;
});

const authReducer = createSlice({
	name: "auth",
	initialState: {
		status: "idle",
		isConnected: false,
		user: null,
		error: null,
	},
	// Recuperer le state du localhost
	reducers: {
		logout: (state) => {
			state.isConnected = false;
			state.user = null;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				// la fonction login en attente
				state.status = "loading";
			})
			.addCase(login.fulfilled, (state, action) => {
				// la fonction login réussie
				state.status = "succeeded";
				state.user = action.payload; // action.payload contient les données retournées par la fonction login
				state.isConnected = true;
			})
			.addCase(login.rejected, (state, action) => {
				// la fonction login échouée
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(register.pending, (state) => {
				// la fonction register en attente
				state.status = "loading";
			})
			.addCase(register.fulfilled, (state, action) => {
				// la fonction register réussie
				state.status = "succeeded";
				state.user = action.payload; // action.payload contient les données retournées par la fonction register
				state.isConnected = true;
			})
			.addCase(register.rejected, (state, action) => {
				// la fonction register échouée
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(refreshToken.pending, (state) => {
				// la fonction refreshToken en attente
				state.status = "loading";
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				// la fonction refreshToken réussie
				state.status = "succeeded";
				state.isConnected = true;
			})
			.addCase(refreshToken.rejected, (state, action) => {
				// la fonction refreshToken échouée
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(getUser.pending, (state) => {
				// la fonction getUser en attente
				state.status = "loading";
			})
			.addCase(getUser.fulfilled, (state, action) => {
				// la fonction getUser réussie
				state.status = "succeeded";
				state.user = action.payload; // action.payload contient les données retournées par la fonction getUser
			})
			.addCase(getUser.rejected, (state, action) => {
				// la fonction getUser échouée
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { logout } = authReducer.actions;

export default authReducer.reducer;

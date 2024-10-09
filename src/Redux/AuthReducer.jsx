import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MyAxios from "../Interceptor/MyAxios";

// Action Reducer

export const login = createAsyncThunk("auth/login", async (data) => {
	const response = await MyAxios.post("/auth/connexion", data);
	console.log(response);
	return response;
});

export const register = createAsyncThunk("auth/register", async (data) => {
	const response = await MyAxios.post("/auth/inscription", data);
	console.log("response", response);
	if (!response.ok) {
		throw new Error(response.message || "Could not authenticate you.");
	}
	console.log(response);
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
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => { // la fonction login en attente
				state.status = "loading";
			})
			.addCase(login.fulfilled, (state, action) => { // la fonction login réussie
				state.status = "succeeded";
				state.user = action.payload; // action.payload contient les données retournées par la fonction login
				state.isConnected = true;
			})
			.addCase(login.rejected, (state, action) => { // la fonction login échouée
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(register.pending, (state) => { // la fonction register en attente
				state.status = "loading";
			})
			.addCase(register.fulfilled, (state, action) => { // la fonction register réussie
				state.status = "succeeded";
				state.user = action.payload; // action.payload contient les données retournées par la fonction register
				state.isConnected = true;
			})
			.addCase(register.rejected, (state, action) => { // la fonction register échouée
				state.status = "failed";
				state.error = action.error.message;
			});
	}
});


export default authReducer.reducer;


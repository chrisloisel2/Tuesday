import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MyAxios from "../Interceptor/MyAxios";

export const fetchCursus = createAsyncThunk("item/fetchCursus", async () => {
	const response = await MyAxios.get("/cursus");
	console.log(response);
	return response;
});

export const fetchFormation = createAsyncThunk("item/fetchFormation", async () => {
	const response = await MyAxios.get("/formation");
	console.log("FOMRATIONSSS =>", response);
	return response;
});



const FrontReducer = createSlice({
	name: "item",
	initialState: {
		status: "idle",
		cursus: {
			status: "idle",
			data: [],
			error: null,
		},
		formations: {
			status: "idle",
			data: [],
			selectedFormation: null,
			error: null,
		},
		error: null,
	},
	reducers: {
		resetAll: (state) => {
			state.status = "idle";
			state.cursus.status = "idle";
			state.cursus.data = [];
			state.cursus.error = null;
			state.formations.status = "idle";
			state.formations.data = [];
			state.formations.error = null;
			state.error = null;
		},
		getFormationByCustomId: (state, action) => {
			state.formations.selectedFormation = state.formations.data.find(
				(formation) => formation.customId === action.payload
			);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCursus.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchCursus.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.cursus.data = action.payload;
			})
			.addCase(fetchCursus.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(fetchFormation.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchFormation.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.formations.data = action.payload;
			})
			.addCase(fetchFormation.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default FrontReducer.reducer;
export const { resetAll, getFormationByCustomId } = FrontReducer.actions;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MyAxios from "../Interceptor/MyAxios";

export const getAllItems = createAsyncThunk("item/getAllItems", async () => {
	const response = await MyAxios.get("/item/items");
	return response;
});

export const createItem = createAsyncThunk(
	"item/createItem",
	async (newItem) => {
		const response = await MyAxios.post("/item/items", newItem);
		return response;
	}
);

export const getItemsByFormateur = createAsyncThunk(
	"item/getItemsByFormateur",
	async (formateurId) => {
		const response = await MyAxios.get(`/item/items/formateur/${formateurId}`);
		return response;
	}
);

export const updateItem = createAsyncThunk("item/updateItem", async (item) => {
	console.log(item);
	const response = await MyAxios.put(`/item/items/${item._id}`, item);
	return response;
});

export const deleteItem = createAsyncThunk(
	"item/deleteItem",
	async (itemId) => {
		const response = await MyAxios.delete(`/item/items/${itemId}`);
		return response;
	}
);

const itemReducer = createSlice({
	name: "item",
	initialState: {
		status: "idle",
		items: [],
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllItems.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getAllItems.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.items = action.payload;
			})
			.addCase(getAllItems.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(createItem.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createItem.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.items.push(action.payload);
			})
			.addCase(createItem.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(getItemsByFormateur.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getItemsByFormateur.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.items = action.payload;
			})
			.addCase(getItemsByFormateur.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(updateItem.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateItem.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.items = state.items.map((item) =>
					item._id === action.payload._id ? action.payload : item
				);
			})
			.addCase(updateItem.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(deleteItem.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteItem.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.items = state.items.filter((item) => item._id !== action.payload);
			})
			.addCase(deleteItem.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default itemReducer.reducer;

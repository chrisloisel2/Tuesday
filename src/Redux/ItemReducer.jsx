import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MyAxios from "../Interceptor/MyAxios";
import { useDispatch } from "react-redux";
import { getTable } from "./TablesReducer";
import { updateCell } from "./cellReducer";

export const HandleUpdate = (item, columnKey, columnValue) => {
	const dispatch = useDispatch();
	const updatedItem = {
		...item,
		columns: [
			...item.columns.filter((col) => col.columnId !== columnKey),
			{ columnId: columnKey, value: columnValue },
		],
	};

	dispatch(updateItem(updatedItem));
};

export const getAllItems = createAsyncThunk("item/getAllItems", async () => {
	const response = await MyAxios.get("/item/items");
	return response;
});

export const createItem = createAsyncThunk(
	"item/createItem",
	async (newItem) => {
		const response = await MyAxios.post("/item/items", newItem);
		response.cells = [];
		response.columns = response.columns.map((column) => {
			response.cells.push({
				itemId: response._id,
				...column
			});
			return column._id;
		});
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
		items: {},
		error: null,
		selectedItems: [],
	},
	reducers: {
		selectItem: (state, action) => {
			if (state.selectedItems.includes(action.payload)) {
				state.selectedItems = state.selectedItems.filter(
					(id) => id !== action.payload
				);
			}
			else {
				state.selectedItems.push(action.payload);
			}
		},

		selectItems: (state, action) => {
			console.log("selectItems", action.payload);
			action.payload.forEach((item) => {
				console.log("selectItems", item);
				if (!state.selectedItems.includes(item)) {
					state.selectedItems.push(item);
				}
			});
		},
		selectAll: (state, action) => {
			if (state.selectedItems.length === state.items.length) {
				state.selectedItems = [];
			}
			else {
				state.selectedItems = state.items.map((item) => item._id);
			}
		},
		resetSelectedItems: (state) => {
			state.selectedItems = [];
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTable.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getTable.fulfilled, (state, action) => {
				state.status = "succeeded";
				action.payload.items.forEach((item) => {
					item = {
						...item,
						columns: item.columns.map((column) => column._id),
					}
					state.items[item._id] = item;
				});
			})
			.addCase(getTable.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(getAllItems.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getAllItems.fulfilled, (state, action) => {
				state.status = "succeeded";
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
				state.items[action.payload._id] = action.payload;
			})
			.addCase(createItem.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			// .addCase(updateCell.pending, (state) => {
			// 	state.status = "loading";
			// })
			// .addCase(updateCell.fulfilled, (state, action) => {
			// 	state.status = "succeeded";
			// 	console.log("updateCell", action.payload);
			// 	state.items[action.payload._id] = action.payload;
			// })
			// .addCase(updateCell.rejected, (state, action) => {
			// 	state.status = "failed";
			// 	state.error = action.error.message;
			// })
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
				state.items = Object.values(state.items).filter(
					(item) => item._id !== action.payload._id
				);
			})
			.addCase(deleteItem.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { selectItem, selectAll, selectItems, resetSelectedItems } = itemReducer.actions;

export default itemReducer.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MyAxios from "../Interceptor/MyAxios";
import { createItem, deleteItem, updateItem } from "./ItemReducer";


export const createTable = createAsyncThunk(
	"board/createTable",
	async (data) => {
		const response = await MyAxios.post("/table/table", { boardId: data });
		return response;
	}
);

export const updateTable = createAsyncThunk(
	"table/updateTable",
	async (data) => {
		const response = await MyAxios.put("/table/table/" + data._id, data);
		return response;
	}
);

export const deleteTable = createAsyncThunk(
	"board/deleteTable",
	async (data) => {
		const response = await MyAxios.delete("/board/table/" + data);
		return response;
	}
);

export const getTable = createAsyncThunk(
	"board/getTable",
	async (data) => {
		const response = await MyAxios.get("/table/table/" + data);
		response.table = response.content;
		response.items = [];
		response.table.forEach((item) => {
			response.items.push(item);
		});
		response.cells = [];
		response.items.forEach((item) => {
			item.columns.forEach((column) => {
				column.itemId = item._id;
				response.cells.push(column);
			});
		});
		return response;
	}
);

const TablesReducer = createSlice({
	name: "board",
	initialState: {
		tables: [],
		status: "idle",
		error: null,
		openTable: [],
	},
	reducers: {
		setOpenTable: (state, action) => {
			if (state.openTable?.find((m) => m._id === action.payload._id)) {
				state.openTable = state.openTable?.filter((m) => m._id !== action.payload._id);
			}
			else if (state.openTable) {
				state.openTable = [...state.openTable, action.payload];
			}
			else {
				state.openTable = [action.payload];
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTable.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getTable.fulfilled, (state, action) => {
				state.status = "succeeded";
				let temp = action.payload;
				temp.content = action.payload.content.map((item) => item._id);
				if (state.tables.find((table) => table._id === action.payload._id)) {
					state.tables = state.tables.map((table) => {
						if (table._id === action.payload._id) {
							return temp;
						}
						return table;
					});
				}
				else {
					state.tables.push(action.payload);
				}
			})
			.addCase(getTable.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(createItem.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createItem.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.tables.forEach((table) => {
					if (table._id === action.payload.table) {
						table.content.push(action.payload._id);
					}
				});
			})
			.addCase(createItem.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(createTable.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createTable.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.tables.push(action.payload)
			})
			.addCase(createTable.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(updateTable.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateTable.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.tables = state.tables.map((table) => {
					if (table._id === action.payload._id) {
						return action.payload;
					}
					return table;
				})
			})
			.addCase(updateTable.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(deleteTable.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteTable.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.board = state.board.map((item) => {
					if (item._id === action.payload._id) {
						return action.payload;
					}
					return item;
				});
				state.isConnected = true;
			})
			.addCase(deleteTable.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
	},
});

export const { selectBoard, resetBoard, setOpenTable, SelectedView, getItemById } = TablesReducer.actions;

export default TablesReducer.reducer;

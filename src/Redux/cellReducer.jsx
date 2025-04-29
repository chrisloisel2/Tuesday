import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MyAxios from "../Interceptor/MyAxios";
import { useDispatch } from "react-redux";
import { getTable } from "./TablesReducer";
import { createItem } from "./ItemReducer";

export const HandleUpdate = (cell, columnKey, columnValue) => {
	const dispatch = useDispatch();
	const updatedcell = {
		...cell,
		columns: [
			...cell.columns.filter((col) => col.columnId !== columnKey),
			{ columnId: columnKey, value: columnValue },
		],
	};

	dispatch(updateCell(updatedcell));
};

export const getAllcells = createAsyncThunk("cell/getAllcells", async () => {
	const response = await MyAxios.get("/cell/cells");
	return response;
});

export const createCell = createAsyncThunk(
	"cell/createcell",
	async (newcell) => {
		const response = await MyAxios.post(`/cell/${newcell.itemId}/${newcell.columnId}`, newcell);
		return response;
	}
);

export const getcellsByFormateur = createAsyncThunk(
	"cell/getcellsByFormateur",
	async (formateurId) => {
		const response = await MyAxios.get(`/cell/cells/formateur/${formateurId}`);
		return response;
	}
);

export const updateCell = createAsyncThunk("cell/updateCell", async (cell) => {
	console.log("updateCell", cell);
	const columnId = cell.columnId._id ? cell.columnId._id : cell.columnId;
	console.log("updateCell", cell);
	const response = await MyAxios.put(`/cell/${cell.itemId}/${columnId}`, cell);
	return response;
});

export const deleteCell = createAsyncThunk(
	"cell/deleteCell",
	async (cell) => {
		const response = await MyAxios.delete(`/cell/${cell.itemId}/${cell.columnId}`);
		return response;
	}
);

const cellReducer = createSlice({
	name: "cell",
	initialState: {
		status: "idle",
		cells: {},
		error: null,
	},
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(createItem.pending, (state) => {
			})
			.addCase(createItem.fulfilled, (state, action) => {
				state.status = "succeeded";
				console.log("createItem", action.payload);
				action.payload.cells.forEach((cell) => {
					const columnId = cell.columnId?._id ? cell.columnId._id : cell.columnId;
					const doubleKey = `${cell.itemId}-${columnId}`;
					console.log("doubleKey", doubleKey);
					state.cells[doubleKey] = cell;
				});
			})
			.addCase(createItem.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(getTable.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getTable.fulfilled, (state, action) => {
				state.status = "succeeded";
				action.payload.cells.forEach((cell) => {
					const columnId = cell.columnId?._id ? cell.columnId._id : cell.columnId;
					const doubleKey = `${cell.itemId}-${columnId}`;
					state.cells[doubleKey] = cell;
				});
			})
			.addCase(getTable.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(getAllcells.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getAllcells.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.cells = action.payload;
			})
			.addCase(getAllcells.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(createCell.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createCell.fulfilled, (state, action) => {
				state.status = "succeeded";
				console.log("createCell", action.payload);
				if ((!action.payload.columnId && !action.payload.columnId._id) || !action.payload.itemId) {
					console.error("Invalid cell data:", action.payload);
					return;
				}
				const columnId = action.payload.columnId._id ? action.payload.columnId._id : action.payload.columnId;
				state.cells[`${action.payload.itemId}-${columnId}`] = action.payload;
			})
			.addCase(createCell.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(getcellsByFormateur.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getcellsByFormateur.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.cells = action.payload;
			})
			.addCase(getcellsByFormateur.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(updateCell.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateCell.fulfilled, (state, action) => {
				state.status = "succeeded";
				console.log("updateCell", action.payload);
				state.cells[`${action.payload.itemId}-${action.payload.columnId._id}`] = action.payload;
			})
			.addCase(updateCell.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(deleteCell.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteCell.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.cells = state.cells.filter((cell) => cell._id !== action.payload._id);
				state.selectedcells = state.selectedcells.filter(
					(_id) => _id !== action.payload._id
				);
			})
			.addCase(deleteCell.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { selectcell, selectAll } = cellReducer.actions;

export default cellReducer.reducer;

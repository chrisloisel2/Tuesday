import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MyAxios from "../Interceptor/MyAxios";
import { createItem, deleteItem, updateItem } from "./ItemReducer";




export const GetBoards = createAsyncThunk("board/getAll", async (data) => {
	const response = await MyAxios.get("/board/", data);
	return response;
});

export const DeleteBoard = createAsyncThunk(
	"board/deleteBoard",
	async (data) => {
		const response = await MyAxios.delete("/board/" + data);
		return response;
	}
);

export const GetBoardFromUser = createAsyncThunk("board/getAllFromUser", async (data) => {
	const response = await MyAxios.get("/board/user/" + data);
	return response;
});

export const GetBoard = createAsyncThunk("board/getBoard", async (data) => {
	const response = await MyAxios.get("/board/" + data);
	return response;
});

export const CreateBoard = createAsyncThunk(
	"board/createBoard",
	async (data) => {
		const response = await MyAxios.post("/board/", data);
		return response;
	}
);

export const UpdateBoard = createAsyncThunk(
	"board/updateBoard",
	async (data) => {
		const response = await MyAxios.put("/board/" + data._id, data);
		return response;
	}
);

export const updateColumns = createAsyncThunk(
	"board/updateColumns",
	async (data) => {
		const response = await MyAxios.put("/board/column/" + data._id, data);
		return response;
	}
);

export const deleteColumn = createAsyncThunk(
	"board/deleteColumn",
	async (data) => {
		const response = await MyAxios.delete(`/board/${data.boardID}/column/${data.columnID}`);
		return response;
	}
);

export const createColumn = createAsyncThunk(
	"board/createColumn",
	async ({ data, id }) => {
		const response = await MyAxios.post("/board/column/" + id, data);
		return response;
	}
);

export const uploadFile = createAsyncThunk("board/uploadFile", async (data) => {
	const response = await MyAxios.post("/item/upload", data, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return response;
});

export const updateFile = createAsyncThunk("board/updateFile", async (data) => {
	const response = await MyAxios.put("/item/upload", data, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return response;
});

export const ArchiveBoard = createAsyncThunk(
	"board/archiveBoard",
	async (data) => {
		const response = await MyAxios.put("/board/archive/" + data);
		return response;
	}
);

export const toggleFavoriteBoard = createAsyncThunk(
	"board/toggleFavoriteBoard",
	async (data) => {
		const response = await MyAxios.put("/board/favorite/" + data);
		return response;
	}
);

export const getBoard = createAsyncThunk("board/getBoard", async (boardId) => {
	const response = await MyAxios.get(`/api/board/${boardId}`);
	return response.data;
});


const BoardReducer = createSlice({
	name: "board",
	initialState: {
		activeBoard: {},
		status: "idle",
		board: [],
		error: null,
		openTable: [],
		selectedView: null,
	},
	reducers: {
		getItemById: (state, action) => {
			return state.activeBoard.content.find((item) => item._id === action.payload.table).content.find((item) => item._id === action.payload.id);
		},
		SelectedView: (state, action) => {
			state.selectedView = action.payload;
		},
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
		selectBoard: (state, action) => {
			state.activeBoard = action.payload;
		},
		resetBoard: (state, useDispatch) => {
			const dispatch = useDispatch;
			dispatch(GetBoards());
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createColumn.pending, (state) => {
				// la fonction createColumn en attente
				state.status = "loading";
			})
			.addCase(createColumn.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.activeBoard.columns.push(action.payload);
			})
			.addCase(createColumn.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(GetBoardFromUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(GetBoardFromUser.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.board = action.payload;
			})
			.addCase(GetBoardFromUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(GetBoards.pending, (state) => {
				// la fonction GetBoards en attente
				state.status = "loading";
			})
			.addCase(GetBoards.fulfilled, (state, action) => {
				// la fonction GetBoards réussie
				state.status = "succeeded";
				state.board = action.payload; // action.payload contient les données retournées par la fonction GetBoards
			})
			.addCase(GetBoards.rejected, (state, action) => {
				// la fonction GetBoards échouée
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(CreateBoard.pending, (state) => {
				// la fonction register en attente
				state.status = "loading";
			})
			.addCase(CreateBoard.fulfilled, (state, action) => {
				// la fonction register réussie
				state.status = "succeeded";
				state.board.push(action.payload); // action.payload contient les données retournées par la fonction register
				state.isConnected = true;
			})
			.addCase(CreateBoard.rejected, (state, action) => {
				// la fonction register échouée
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(UpdateBoard.pending, (state) => {
				// la fonction register en attente
				state.status = "loading";
			})
			.addCase(UpdateBoard.fulfilled, (state, action) => {
				// la fonction register réussie
				state.status = "succeeded";
				state.board = state.board.map((item) => {
					if (item._id === action.payload._id) {
						return action.payload;
					}
					return item;
				});
				state.isConnected = true;
			})
			.addCase(UpdateBoard.rejected, (state, action) => {
				// la fonction register échouée
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(DeleteBoard.pending, (state) => {
				// la fonction register en attente
				state.status = "loading";
			})
			.addCase(DeleteBoard.fulfilled, (state, action) => {
				// la fonction register réussie
				state.status = "succeeded";
				state.board = state.board.view((item) => item._id !== action.payload._id);
			})
			.addCase(DeleteBoard.rejected, (state, action) => {
				// la fonction register échouée
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(ArchiveBoard.pending, (state) => {
				// la fonction register en attente
				state.status = "loading";
			})
			.addCase(ArchiveBoard.fulfilled, (state, action) => {
				// la fonction register réussie
				state.status = "succeeded";
				state.board = state.board.filter((item) => item._id !== action.payload);
				state.isConnected = true;
			})
			.addCase(ArchiveBoard.rejected, (state, action) => {
				// la fonction register échouée
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(toggleFavoriteBoard.pending, (state) => {
				// la fonction register en attente
				state.status = "loading";
			})
			.addCase(toggleFavoriteBoard.fulfilled, (state, action) => {
				// la fonction register réussie
				state.status = "succeeded";
				state.board = state.board.map((item) => {
					if (item._id === action.payload._id) {
						return action.payload;
					}
					return item;
				});
				state.isConnected = true;
			})
			.addCase(toggleFavoriteBoard.rejected, (state, action) => {
				// la fonction register échouée
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(GetBoard.pending, (state) => {
				state.status = "loading";
			})
			.addCase(GetBoard.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.activeBoard = action.payload;
			})
			.addCase(GetBoard.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(deleteColumn.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteColumn.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.activeBoard.columns = state.activeBoard.columns.filter((item) => item._id !== action.payload);
			})
			.addCase(deleteColumn.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { selectBoard, resetBoard, setOpenTable, getItemById } = BoardReducer.actions;

export default BoardReducer.reducer;

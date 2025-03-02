import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MyAxios from "../Interceptor/MyAxios";
import { createItem, deleteItem, updateItem } from "./ItemReducer";


export const updateViewSharing = createAsyncThunk(
	"board/updateViewSharing",
	async (data) => {
		const response = await MyAxios.put("/view/sharing/" + data._id, data);
		return response;
	}
);

export const GetBoards = createAsyncThunk("board/getAll", async (data) => {
	const response = await MyAxios.get("/board/", data);
	return response;
});

export const GetBoard = createAsyncThunk("board/getBoard", async (data) => {
	const response = await MyAxios.get("/board/" + data);
	return response;
});

export const CreateBoard = createAsyncThunk(
	"board/createBoard",
	async (data) => {
		console.log("create board", data);
		const response = await MyAxios.post("/board/", data);
		console.log(response);
		return response;
	}
);

export const UpdateBoard = createAsyncThunk(
	"board/updateBoard",
	async (data) => {
		const response = await MyAxios.put("/board/" + data._id, data);
		console.log(response);
		return response;
	}
);

export const updateColumns = createAsyncThunk(
	"board/updateColumns",
	async ({ id, data }) => {
		console.log("update columns", id, data);
		const response = await MyAxios.put("/board/column/" + id, data);
		console.log("response", response);
		return response;
	}
);

// const response = await MyAxios.put("/item/upload", formData, {
// 	headers: { "Content-Type": "multipart/form-data" },
// });

export const updateFile = createAsyncThunk(
	"board/updateFile",
	async (data) => {
		const response = await MyAxios.put("/item/upload", data, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return response;
	});

export const DeleteBoard = createAsyncThunk(
	"board/deleteBoard",
	async (data) => {
		const response = await MyAxios.delete("/board/" + data);
		return response;
	}
);

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

export const creteView = createAsyncThunk("board/createView", async (data) => {
	const response = await MyAxios.post("/view/view", data);
	return response;
});

export const updateView = createAsyncThunk("board/updateView", async (data) => {
	const response = await MyAxios.put("/view/view/" + data._id, data);
	return response;
});

export const deleteView = createAsyncThunk("board/deleteView", async (data) => {
	const response = await MyAxios.delete("/view/view/" + data);
	return response;
});

export const getViews = createAsyncThunk("board/getViews", async (data) => {
	const response = await MyAxios.get("/board/view/" + data);
	return response;
});

export const createTable = createAsyncThunk(
	"board/createTable",
	async (data) => {
		const response = await MyAxios.post("/table/table", { boardId: data });
		console.log(response);
		return response;
	}
);

export const updateTable = createAsyncThunk(
	"table/updateTable",
	async (data) => {
		console.log("update table", data);
		const response = await MyAxios.put("/table/table/" + data._id, data);
		console.log(response);
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
			console.log(state.activeBoard);
			state.activeBoard = action.payload;
			console.log("state.activeBoard", state.activeBoard);
		},
		resetBoard: (state, useDispatch) => {
			const dispatch = useDispatch;
			dispatch(GetBoards());
		},
	},
	extraReducers: (builder) => {
		builder
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
				console.log(action.payload);
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
			.addCase(creteView.pending, (state) => {
				state.status = "loading";
			})
			.addCase(creteView.fulfilled, (state, action) => {
				state.status = "succeeded";
				console.log("create view", action.payload);
				state.activeBoard.view.push(action.payload);
			})
			.addCase(creteView.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(updateView.pending, (state) => {
				// la fonction register en attente
				state.status = "loading";
			})
			.addCase(updateView.fulfilled, (state, action) => {
				// la fonction register réussie
				state.status = "succeeded";
				console.log("update view", action.payload);
				state.activeBoard.view = state.activeBoard.view.map((item) => {
					if (item._id === action.payload._id) {
						return action.payload;
					}
					return item;
				});
				state.selectedView = action.payload;
				state.isConnected = true;
			})
			.addCase(updateView.rejected, (state, action) => {
				// la fonction register échouée
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(deleteView.pending, (state) => {
				// la fonction register en attente
				state.status = "loading";
			})
			.addCase(deleteView.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.activeBoard.view = state.activeBoard.view.filter((item) => item._id !== action.payload._id);
				state.selectedView = state.activeBoard.view[0];
				state.isConnected = true;
			})
			.addCase(deleteView.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(getViews.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getViews.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.board = state.board.map((item) => {
					if (item._id === action.payload._id) {
						return action.payload;
					}
					return item;
				});
				state.isConnected = true;
			})
			.addCase(getViews.rejected, (state, action) => {
				// la fonction register échouée
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(createTable.pending, (state) => {
				// la fonction register en attente
				state.status = "loading";
			})
			.addCase(createTable.fulfilled, (state, action) => {
				// la fonction register réussie
				state.status = "succeeded";
				state.activeBoard = action.payload;
				state.isConnected = true;
			})
			.addCase(createTable.rejected, (state, action) => {
				// la fonction register échouée
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(updateTable.pending, (state) => {
				// la fonction register en attente
				state.status = "loading";
			})
			.addCase(updateTable.fulfilled, (state, action) => {
				// la fonction register réussie
				state.status = "succeeded";
				state.activeBoard.content = state.activeBoard.content.map((item) => {
					if (item._id === action.payload._id) {
						return action.payload;
					}
					return item;
				});
			})
			.addCase(updateTable.rejected, (state, action) => {
				// la fonction register échouée
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(deleteTable.pending, (state) => {
				// la fonction register en attente
				state.status = "loading";
			})
			.addCase(deleteTable.fulfilled, (state, action) => {
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
			.addCase(deleteTable.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(updateColumns.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateColumns.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.activeBoard.columns = action.payload.columns;
				state.isConnected = true;
			})
			.addCase(updateColumns.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(updateItem.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateItem.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.activeBoard.content = state.activeBoard.content.map((item) => {
					if (item._id === action.payload.table) {
						// Mise à jour des colonnes et recherche de l'élément à modifier
						item.content = item.content.map((innerItem) => {
							if (innerItem._id === action.payload._id) {
								return { ...innerItem, ...action.payload }; // Fusionne l'élément avec les nouvelles données
							}
							return innerItem;
						});
						item.columns = action.payload.columns; // Met à jour les colonnes si nécessaire
					}
					return item;
				});
			})
			.addCase(updateItem.rejected, (state, action) => {
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
			.addCase(updateViewSharing.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateViewSharing.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.board = state.activeBoard.view.map((item) => {
					if (item._id === action.payload._id) {
						return action.payload;
					}
					return item;
				});
				state.selectedView = action.payload;
			})
			.addCase(updateViewSharing.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(createItem.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createItem.fulfilled, (state, action) => {
				state.status = "succeeded";
				console.log("new item", action.payload);
				state.activeBoard.content = state.activeBoard.content.map((item) => {
					console.log("table trouvée", item);
					if (item._id === action.payload.table) {
						console.log("table trouvée ->", item);
						item.content.push(action.payload);
						console.log("table trouvée ->", item);
					}
					return item;
				}
				);
			})
			.addCase(createItem.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(deleteItem.fulfilled, (state, action) => {
				state.activeBoard.content = state.activeBoard.content.map((item) => {
					if (item._id === action.payload.table) {
						item.content = item.content.filter((innerItem) => innerItem._id !== action.payload._id);
					}
					return item;
				});
			})
			.addCase(deleteItem.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(updateFile.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateFile.fulfilled, (state, action) => {
				state.status = "succeeded";
			})
			.addCase(updateFile.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { selectBoard, resetBoard, setOpenTable, SelectedView, getItemById } = BoardReducer.actions;

export default BoardReducer.reducer;

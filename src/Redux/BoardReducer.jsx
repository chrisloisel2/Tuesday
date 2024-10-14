import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MyAxios from "../Interceptor/MyAxios";

// Action Reducer

export const GetBoards = createAsyncThunk("board/getAll", async (data) => {
  const response = await MyAxios.get("/board/", data);
  console.log(response);
  return response;
});

export const CreateBoard = createAsyncThunk(
  "board/createBoard",
  async (data) => {
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

export const DeleteBoard = createAsyncThunk(
  "board/deleteBoard",
  async (data) => {
    const response = await MyAxios.delete("/board/" + data);
    console.log(response);
    return response;
  }
);

export const ArchiveBoard = createAsyncThunk(
  "board/archiveBoard",
  async (data) => {
    const response = await MyAxios.put("/board/archive/" + data);
    console.log(response);
    return response;
  }
);

export const toggleFavoriteBoard = createAsyncThunk(
  "board/toggleFavoriteBoard",
  async (data) => {
    const response = await MyAxios.put("/board/favorite/" + data);
    console.log(response);
    return response;
  }
);

export const creteView = createAsyncThunk("board/createView", async (data) => {
  const response = await MyAxios.post("/board/view", data);
  console.log(response);
  return response;
});

export const updateView = createAsyncThunk("board/updateView", async (data) => {
  const response = await MyAxios.put("/board/view/" + data._id, data);
  console.log(response);
  return response;
});

export const deleteView = createAsyncThunk("board/deleteView", async (data) => {
  const response = await MyAxios.delete("/board/view/" + data);
  console.log(response);
  return response;
});

export const getViews = createAsyncThunk("board/getViews", async (data) => {
  const response = await MyAxios.get("/board/view/" + data);
  console.log(response);
  return response;
});

export const createTable = createAsyncThunk(
  "board/createTable",
  async (data) => {
    console.log(data);
    const response = await MyAxios.post("/table/table", { boardId: data });
    console.log(response);
    return response;
  }
);

export const updateTable = createAsyncThunk(
  "table/updateTable",
  async (data) => {
    console.log("PREVIOUS -_>", data);
    const response = await MyAxios.put("/table/table/" + data._id, data);
    return response;
  }
);

export const deleteTable = createAsyncThunk(
  "board/deleteTable",
  async (data) => {
    const response = await MyAxios.delete("/board/table/" + data);
    console.log(response);
    return response;
  }
);

const BoardReducer = createSlice({
  name: "board",
  initialState: {
    status: "idle",
    board: [],
    error: null,
  },
  reducers: {
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
        state.board = state.board.filter((item) => item._id !== action.payload);
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
        // la fonction register en attente
        state.status = "loading";
      })
      .addCase(creteView.fulfilled, (state, action) => {
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
      .addCase(creteView.rejected, (state, action) => {
        // la fonction register échouée
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
        state.board = state.board.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
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
      .addCase(deleteView.rejected, (state, action) => {
        // la fonction register échouée
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getViews.pending, (state) => {
        // la fonction register en attente
        state.status = "loading";
      })
      .addCase(getViews.fulfilled, (state, action) => {
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
        state.board = state.board.map((item) => {
          if (item._id === action.payload.board) {
            item.content.push(action.payload);
          }
          return item;
        });
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
        state.board = state.board.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
        state.isConnected = true;
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
        // la fonction register échouée
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default BoardReducer.reducer;

// userReducer just to getAllusers with get on /user route
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MyAxios from "../Interceptor/MyAxios";

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
	const response = await MyAxios.get("/user");
	return response;
});

const userReducer = createSlice({
	name: "user",
	initialState: {
		status: "idle",
		users: [],
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllUsers.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getAllUsers.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.users = action.payload;
			})
			.addCase(getAllUsers.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default userReducer.reducer;

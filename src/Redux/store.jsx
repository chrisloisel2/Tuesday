import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import BoardReducer from "./BoardReducer";
import UserReducer from "./UserReducer";
import ItemReducer from "./ItemReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    board: BoardReducer,
    users: UserReducer,
    items: ItemReducer,
  },
});

export default store;

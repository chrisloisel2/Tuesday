import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import BoardReducer from "./BoardReducer";
import UserReducer from "./UserReducer";
import ItemReducer from "./ItemReducer";
import FrontReducer from "./FrontReducer";


// Middleware pour sauvegarder l'état dans localStorage
const saveToLocalStorage = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('appState', serializedState);
	} catch (e) {
		console.warn(e);
	}
};

// Middleware pour gérer la sauvegarde de l'état
const localStorageMiddleware = (store) => (next) => (action) => {
	const result = next(action);
	saveToLocalStorage(store.getState());
	return result;
};

const loadFromLocalStorage = () => {
	try {
		const serializedState = localStorage.getItem('appState');
		if (serializedState === null) return undefined;
		return JSON.parse(serializedState);
	} catch (e) {
		console.warn(e);
		return undefined;
	}
};

const preloadedState = loadFromLocalStorage();

const store = configureStore({
	reducer: {
		auth: AuthReducer,
		board: BoardReducer,
		users: UserReducer,
		items: ItemReducer,
		front: FrontReducer,
	},
	preloadedState,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;

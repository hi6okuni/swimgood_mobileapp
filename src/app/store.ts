import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import usersSlice from "../features/users/usersSlice";

const rootReducer = combineReducers({
    users: usersSlice,
});

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
    reducer: rootReducer,
});

export default store;
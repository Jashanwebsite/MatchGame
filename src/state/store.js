// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducer";

const store = configureStore({ reducer: { reducers: counterReducer } });

export default store;
import thunk from "redux-thunk";
import themeReducer from "./themeReducer";
import { createStore, applyMiddleware } from "redux";

const store = createStore(themeReducer, applyMiddleware(thunk));

export default store;

import { legacy_createStore as createStore, Store } from "redux";
import IProject from "../types/IProject/IPpoject";
import projectsReducer from "./reducer";

const store = createStore(projectsReducer);

export default store;

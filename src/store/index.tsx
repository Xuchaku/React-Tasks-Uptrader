import {
  applyMiddleware,
  legacy_createStore as createStore,
  Store,
} from "redux";
import createSagaMiddleware from "redux-saga";
import IProject from "../types/IProject/IPpoject";
import projectsReducer from "./reducer";
import { SagaMain } from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(projectsReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(SagaMain);
export default store;

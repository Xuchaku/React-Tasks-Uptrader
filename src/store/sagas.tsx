import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "../api";
import {
  FecthPutProjectAction,
  FetchInitProjectAction,
  FetchProjectsAction,
} from "../types/ActionCreatorsTypes/ActionCreatorsTypes";
import { ActionTypes } from "../types/ActionTypes/ActionTypes";

import { transformToProjects } from "../utils";
import { setFailLoad, setLoad, setProjects } from "./ActionCreators";

function* fetchInitProject(action: FetchInitProjectAction) {
  try {
    yield call(
      api.initProject,
      action.payload.dataBase,
      action.payload.project
    );
  } catch (e) {
    yield put(setFailLoad("Произошла ошибка на сервере"));
  }
}

function* fetchPutProject(action: FecthPutProjectAction) {
  try {
    yield call(
      api.updateProject,
      action.payload.dataBase,
      action.payload.idProject
    );
  } catch (e) {
    yield put(setFailLoad("Произошла ошибка на сервере"));
  }
}

function* fetchProjects(action: FetchProjectsAction) {
  yield put(setLoad(true));
  try {
    const projectsDocs = (yield call(
      api.fetchProjects,
      action.payload.dataBase
    )) as QuerySnapshot<DocumentData>;

    const projects = transformToProjects(projectsDocs);
    console.log(projects);
    yield put(setProjects(projects));
    yield put(setLoad(false));
  } catch (e) {
    yield put(setFailLoad("Произошла ошибка на сервере"));
    yield put(setLoad(false));
  }
}

export function* SagaMain() {
  yield takeEvery(ActionTypes.FETCH_PROJECTS, fetchProjects);
  yield takeEvery(ActionTypes.UPDATE_PROJECT, fetchPutProject);
  yield takeEvery(ActionTypes.INIT_PROJECT_BACK, fetchInitProject);
}

import { Firestore } from "firebase/firestore";
import { TaskAction } from "../../types/ActionCreatorsTypes/ActionCreatorsTypes";
import { ActionTypes } from "../../types/ActionTypes/ActionTypes";
import IComment from "../../types/IComment/IComment";
import IProject from "../../types/IProject/IPpoject";
import ISubtask from "../../types/ISubtask/ISubtask";
import ITask from "../../types/ITask/ITask";
import Stage from "../../types/Stage/Stage";

export const fetchInitProjectBack = (
  dataBase: Firestore,
  project: IProject
): TaskAction => {
  return {
    type: ActionTypes.INIT_PROJECT_BACK,
    payload: {
      dataBase,
      project,
    },
  };
};

export const putProjectFetch = (
  dataBase: Firestore,
  idProject: string
): TaskAction => {
  return {
    type: ActionTypes.UPDATE_PROJECT,
    payload: {
      dataBase,
      idProject,
    },
  };
};

export const setLoad = (status: boolean): TaskAction => {
  return {
    type: ActionTypes.SET_LOAD,
    payload: { status },
  };
};
export const fetchProjects = (dataBase: Firestore): TaskAction => {
  return {
    type: ActionTypes.FETCH_PROJECTS,
    payload: { dataBase },
  };
};

export const setFailLoad = (message: string): TaskAction => {
  return {
    type: ActionTypes.SET_FAIL,
    payload: {
      message,
    },
  };
};

export const setProjects = (projects: IProject[]): TaskAction => {
  return {
    type: ActionTypes.SET_PROJECTS,
    payload: {
      projects,
    },
  };
};

export const setTaskById = (
  idProject: string,
  idTask: string,
  task: ITask
): TaskAction => {
  return {
    type: ActionTypes.PUT_TASK,
    payload: {
      idProject,
      idTask,
      task,
    },
  };
};

export const setMovedTask = (
  idProject: string,
  fromColumnId: Stage,
  fromIndexTask: number,
  toColumnId: Stage,
  toIndexTask: number | undefined
): TaskAction => {
  return {
    type: ActionTypes.MOVE_TASK,
    payload: {
      idProject,
      fromColumnId,
      fromIndexTask,
      toColumnId,
      toIndexTask,
    },
  };
};

export const setNewTask = (idProject: string, task: ITask): TaskAction => {
  return { type: ActionTypes.ADD_TASK, payload: { task, idProject } };
};

export const setNewComment = (
  idProject: string,
  task: ITask,
  comment: IComment
): TaskAction => {
  return {
    type: ActionTypes.ADD_COMMENT,
    payload: { comment, idProject, task },
  };
};

export const setNewSubComment = (
  idProject: string,
  task: ITask,
  idComment: string,
  comment: IComment
): TaskAction => {
  return {
    type: ActionTypes.SUB_ADD_COMMENT,
    payload: { comment, idProject, idComment, task },
  };
};

export const setNewSubtask = (
  idProject: string,
  task: ITask,
  subtask: ISubtask
): TaskAction => {
  return {
    type: ActionTypes.ADD_SUBTASK,
    payload: { idProject, task, subtask },
  };
};

export const setNewFiles = (
  idProject: string,
  task: ITask,
  files: string[]
): TaskAction => {
  return {
    type: ActionTypes.ADD_FILES,
    payload: { idProject, task, files },
  };
};

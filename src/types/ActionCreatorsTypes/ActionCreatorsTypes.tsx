import { Firestore } from "firebase/firestore";
import { ActionTypes } from "../ActionTypes/ActionTypes";
import IComment from "../IComment/IComment";
import IProject from "../IProject/IPpoject";
import ISubtask from "../ISubtask/ISubtask";
import ITask from "../ITask/ITask";
import Stage from "../Stage/Stage";

export type FetchInitProjectAction = {
  type: ActionTypes.INIT_PROJECT_BACK;
  payload: {
    dataBase: Firestore;
    project: IProject;
  };
};

export type FecthPutProjectAction = {
  type: ActionTypes.UPDATE_PROJECT;
  payload: {
    dataBase: Firestore;
    idProject: string;
  };
};
export type FetchStatusAction = {
  type: ActionTypes.SET_LOAD;
  payload: {
    status: boolean;
  };
};

export type FetchProjectsAction = {
  type: ActionTypes.FETCH_PROJECTS;
  payload: {
    dataBase: Firestore;
  };
};

export type LoadFailAction = {
  type: ActionTypes.SET_FAIL;
  payload: {
    message: string;
  };
};

export type ProjectInitAction = {
  type: ActionTypes.SET_PROJECTS;
  payload: {
    projects: IProject[];
  };
};

export type TaskMoveAction = {
  type: ActionTypes.MOVE_TASK;
  payload: {
    idProject: string;
    fromColumnId: Stage;
    fromIndexTask: number;
    toColumnId: Stage;
    toIndexTask: number | undefined;
  };
};

export type TaskAddAction = {
  type: ActionTypes.ADD_TASK;
  payload: { task: ITask; idProject: string };
};
export type TaskPutAction = {
  type: ActionTypes.PUT_TASK;
  payload: { task: ITask; idProject: string; idTask: string };
};
export type CommentAddAction = {
  type: ActionTypes.ADD_COMMENT;
  payload: { comment: IComment; idProject: string; task: ITask };
};

export type SubCommentAddAction = {
  type: ActionTypes.SUB_ADD_COMMENT;
  payload: {
    idProject: string;
    task: ITask;
    idComment: string;
    comment: IComment;
  };
};

export type SubTaskAddAction = {
  type: ActionTypes.ADD_SUBTASK;
  payload: {
    idProject: string;
    task: ITask;
    subtask: ISubtask;
  };
};

export type FilesAddAction = {
  type: ActionTypes.ADD_FILES;
  payload: {
    idProject: string;
    task: ITask;
    files: string[];
  };
};
export type TaskAction =
  | TaskMoveAction
  | TaskAddAction
  | TaskPutAction
  | CommentAddAction
  | SubCommentAddAction
  | SubTaskAddAction
  | FilesAddAction
  | FetchProjectsAction
  | ProjectInitAction
  | LoadFailAction
  | FetchStatusAction
  | FecthPutProjectAction
  | FetchInitProjectAction;

import IProject from "../../types/IProject/IPpoject";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";
import Stage from "../../types/Stage/Stage";
import ITask from "../../types/ITask/ITask";
import ITasks from "../../types/ITasks/ITasks";
import IComment from "../../types/IComment/IComment";
import ISubtask from "./../../types/ISubtask/ISubtask";
import { Firestore } from "@firebase/firestore";

type ProjectsStore = {
  isLoading: boolean;
  projects: IProject[];
};

export enum ActionTypes {
  MOVE_TASK = "MOVE_TASK",
  ADD_TASK = "ADD_TASK",
  PUT_TASK = "PUT_TASK",
  ADD_COMMENT = "ADD_COMMENT",
  SUB_ADD_COMMENT = "SUB_ADD_COMMENT",
  ADD_SUBTASK = "ADD_SUBTASK",
  ADD_FILES = "ADD_FILES",
  FETCH_PROJECTS = "FETCH_PROJECTS",
  SET_FAIL = "SET_FAIL",
  SET_PROJECTS = "SET_PROJECTS",
  SET_LOAD = "SET_LOAD",
  UPDATE_PROJECT = "UPDATE_PROJECT",
  INIT_PROJECT_BACK = "INIT_PROJECT_BACK",
}

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
type FetchStatusAction = {
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

type LoadFailAction = {
  type: ActionTypes.SET_FAIL;
  payload: {
    message: string;
  };
};

type ProjectInitAction = {
  type: ActionTypes.SET_PROJECTS;
  payload: {
    projects: IProject[];
  };
};

type TaskMoveAction = {
  type: ActionTypes.MOVE_TASK;
  payload: {
    idProject: string;
    fromColumnId: Stage;
    fromIndexTask: number;
    toColumnId: Stage;
    toIndexTask: number | undefined;
  };
};

type TaskAddAction = {
  type: ActionTypes.ADD_TASK;
  payload: { task: ITask; idProject: string };
};
type TaskPutAction = {
  type: ActionTypes.PUT_TASK;
  payload: { task: ITask; idProject: string; idTask: string };
};
type CommentAddAction = {
  type: ActionTypes.ADD_COMMENT;
  payload: { comment: IComment; idProject: string; task: ITask };
};

type SubCommentAddAction = {
  type: ActionTypes.SUB_ADD_COMMENT;
  payload: {
    idProject: string;
    task: ITask;
    idComment: string;
    comment: IComment;
  };
};

type SubTaskAddAction = {
  type: ActionTypes.ADD_SUBTASK;
  payload: {
    idProject: string;
    task: ITask;
    subtask: ISubtask;
  };
};

type FilesAddAction = {
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
const initialState: ProjectsStore = {
  isLoading: false,
  projects: [],
  // projects: [
  //   {
  //     name: "Проект 1",
  //     id: uuidv4(),
  //     tasks: {
  //       queue: [
  //         {
  //           id: uuidv4(),
  //           indexNumber: 0,
  //           title: "Подключить Typescript",
  //           description:
  //             "Подключить технологию чтобы все работало исправно. Проверить все, подключиться к базе, сходить погулять.",
  //           createAt: new Date(),
  //           timeWork: 1700000,
  //           endDate: new Date(),
  //           priority: "medium",
  //           files: ["ts.ts", "com.com", "life.png"],
  //           status: "queue",
  //           subtasks: [
  //             {
  //               id: uuidv4(),
  //               title: "Подключить jquery",
  //               indexNumber: 1,
  //               description:
  //                 "Подключить устаревшую технологию для оживления страницы",
  //               createAt: new Date(),
  //               timeWork: 12352,
  //               endDate: new Date(),
  //               priority: "high",
  //               status: "queue",
  //             },
  //             {
  //               id: uuidv4(),
  //               title: "Подключить angular",
  //               indexNumber: 2,
  //               description:
  //                 "Подключить новую технологию для оживления страницы",
  //               createAt: new Date(),
  //               timeWork: 12352,
  //               endDate: new Date(),
  //               priority: "medium",
  //               status: "development",
  //             },
  //           ],
  //           comments: [
  //             {
  //               id: uuidv4(),
  //               name: "Вася",
  //               text: "Я думаю что получится",
  //               createAt: new Date(),
  //               subComments: [
  //                 {
  //                   id: uuidv4(),
  //                   name: "Юля",
  //                   text: "Мне кажется ты не прав",
  //                   createAt: new Date(),
  //                   subComments: [
  //                     {
  //                       id: uuidv4(),
  //                       name: "Артем",
  //                       text: "Вася прав, ты что, проверь все сама.",
  //                       createAt: new Date(),
  //                       subComments: [],
  //                     },
  //                   ],
  //                 },
  //                 {
  //                   id: uuidv4(),
  //                   name: "Юра",
  //                   text: "Мне кажется все у нас получится, но нужно подумать",
  //                   createAt: new Date(),
  //                   subComments: [],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //       development: [
  //         {
  //           id: uuidv4(),
  //           indexNumber: 0,
  //           title: "Довести до ума CRM",
  //           description:
  //             "Добавить функции управления системой, подготовить к релизу",
  //           createAt: new Date(),
  //           timeWork: 173888,
  //           endDate: new Date(),
  //           priority: "high",
  //           files: ["relise.jpg", "font.png"],
  //           status: "development",
  //           subtasks: [
  //             {
  //               id: uuidv4(),
  //               title: "Переделать админку",
  //               indexNumber: 1,
  //               description: "Переписать на другую технологию",
  //               createAt: new Date(),
  //               timeWork: 12352,
  //               endDate: new Date(),
  //               priority: "medium",
  //               status: "queue",
  //             },
  //             {
  //               id: uuidv4(),
  //               title: "Протестировать систему",
  //               indexNumber: 2,
  //               description: "Добавить тесты на Jest",
  //               createAt: new Date(),
  //               timeWork: 12352,
  //               endDate: new Date(),
  //               priority: "high",
  //               status: "queue",
  //             },
  //           ],
  //           comments: [
  //             {
  //               id: uuidv4(),
  //               name: "Вася",
  //               text: "Я уже посмотрел CRM систему, можно работаьь",
  //               createAt: new Date(),
  //               subComments: [
  //                 {
  //                   id: uuidv4(),
  //                   name: "Юля",
  //                   text: "Да мы готовы к работе",
  //                   createAt: new Date(),
  //                   subComments: [],
  //                 },
  //               ],
  //             },
  //             {
  //               id: uuidv4(),
  //               name: "Юра",
  //               text: "Добавил несколько тестов, проверяйте",
  //               createAt: new Date(),
  //               subComments: [
  //                 {
  //                   id: uuidv4(),
  //                   name: "Вася",
  //                   text: "Вроде работает, продолжай",
  //                   createAt: new Date(),
  //                   subComments: [],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         {
  //           id: uuidv4(),
  //           indexNumber: 1,
  //           title: "Сходить на встречу разработчиков",
  //           description:
  //             "В эту субботу будет встреча разработчиков, будем делиться опытом",
  //           createAt: new Date(),
  //           timeWork: 173888,
  //           endDate: new Date(),
  //           priority: "low",
  //           files: ["photo.jpg", "sheme.ttx"],
  //           status: "development",
  //           subtasks: [
  //             {
  //               id: uuidv4(),
  //               title: "Захватить ноутбук",
  //               indexNumber: 1,
  //               description:
  //                 "Возможно потребуется ноутбук для описания системы",
  //               createAt: new Date(),
  //               timeWork: 12352,
  //               endDate: new Date(),
  //               priority: "low",
  //               status: "development",
  //             },
  //           ],
  //           comments: [
  //             {
  //               id: uuidv4(),
  //               name: "Вася",
  //               text: "Конечно приду, будет интересно",
  //               createAt: new Date(),
  //               subComments: [],
  //             },
  //             {
  //               id: uuidv4(),
  //               name: "Маша",
  //               text: "Будет весело приходите, удачи",
  //               createAt: new Date(),
  //               subComments: [],
  //             },
  //           ],
  //         },
  //         {
  //           id: uuidv4(),
  //           indexNumber: 2,
  //           title: "Добавить метрики Google на сайт",
  //           description: "Разобраться в API google, подключить скрипты",
  //           createAt: new Date(),
  //           timeWork: 1738880000,
  //           endDate: new Date(),
  //           priority: "high",
  //           files: ["metric.json", "google.tsx"],
  //           status: "development",
  //           subtasks: [
  //             {
  //               id: uuidv4(),
  //               title: "Добавить Firebase к проекту",
  //               indexNumber: 1,
  //               description:
  //                 "Подключить систему к Firebase для доступа к google",
  //               createAt: new Date(),
  //               timeWork: 12352,
  //               endDate: new Date(),
  //               priority: "high",
  //               status: "done",
  //             },
  //             {
  //               id: uuidv4(),
  //               title: "Вывести количество просмотров сайта",
  //               indexNumber: 2,
  //               description:
  //                 "Подключить библиотеку для визуализации графиков и на основе данных вывести просмотры",
  //               createAt: new Date(),
  //               timeWork: 12352,
  //               endDate: new Date(),
  //               priority: "high",
  //               status: "development",
  //             },
  //           ],
  //           comments: [
  //             {
  //               id: uuidv4(),
  //               name: "Юра",
  //               text: "Задача сложная, но крутая",
  //               createAt: new Date(),
  //               subComments: [
  //                 {
  //                   id: uuidv4(),
  //                   name: "Вася",
  //                   text: "Мы сможем это сделать вместе",
  //                   createAt: new Date(),
  //                   subComments: [],
  //                 },
  //               ],
  //             },
  //             {
  //               id: uuidv4(),
  //               name: "Вася",
  //               text: "Я уже почти закончил с этим",
  //               createAt: new Date(),
  //               subComments: [],
  //             },
  //           ],
  //         },
  //       ],
  //       done: [
  //         {
  //           id: uuidv4(),
  //           indexNumber: 2,
  //           title: "Задеплоить проект и настроить CI/CD",
  //           description:
  //             "Настроить весь цикл разработки и доставки проекта. Развернуть приложение на Vercel",
  //           createAt: new Date(),
  //           timeWork: 1738880000,
  //           endDate: new Date(),
  //           priority: "high",
  //           files: ["vercel.json"],
  //           status: "done",
  //           subtasks: [
  //             {
  //               id: uuidv4(),
  //               title: "Зарегистрировать проект на Vercel",
  //               indexNumber: 1,
  //               description:
  //                 "Подготовить проект, очистить ненужное, отрефакторить код",
  //               createAt: new Date(),
  //               timeWork: 12352,
  //               endDate: new Date(),
  //               priority: "high",
  //               status: "done",
  //             },
  //             {
  //               id: uuidv4(),
  //               title: "Выбрать любые инструменты CI/CD",
  //               indexNumber: 2,
  //               description:
  //                 "Посоветоваться с разработчиками и выбрать нужный инструментарий",
  //               createAt: new Date(),
  //               timeWork: 12352,
  //               endDate: new Date(),
  //               priority: "high",
  //               status: "development",
  //             },
  //           ],
  //           comments: [
  //             {
  //               id: uuidv4(),
  //               name: "Маша",
  //               text: "Задача сложная, но крутая",
  //               createAt: new Date(),
  //               subComments: [
  //                 {
  //                   id: uuidv4(),
  //                   name: "Вася",
  //                   text: "Мы сможем это сделать вместе",
  //                   createAt: new Date(),
  //                   subComments: [],
  //                 },
  //               ],
  //             },
  //             {
  //               id: uuidv4(),
  //               name: "Вася",
  //               text: "Я уже почти закончил с этим",
  //               createAt: new Date(),
  //               subComments: [],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   },
  // ],
};

function projectsReducer(
  state: ProjectsStore = initialState,
  action: TaskAction
): ProjectsStore {
  switch (action.type) {
    case ActionTypes.MOVE_TASK: {
      const nextState = produce(state, (draft) => {
        const { projects } = draft;
        const {
          idProject,
          fromColumnId,
          fromIndexTask,
          toColumnId,
          toIndexTask,
        } = action.payload;

        if (toIndexTask === undefined) return;

        const project = projects.find((project) => project.id == idProject);
        if (project) {
          const { tasks } = project;
          const targetTask = tasks[fromColumnId][fromIndexTask];
          const targetIndexTask = fromIndexTask;
          if (targetTask) {
            tasks[fromColumnId].splice(targetIndexTask, 1);
            targetTask.status = toColumnId;
            tasks[toColumnId].splice(toIndexTask, 0, targetTask);
          }
        }
      });
      return nextState;
    }
    case ActionTypes.ADD_TASK: {
      const nextState = produce(state, (draft) => {
        const { task: newTask, idProject } = action.payload;
        const targetProject = draft.projects.find(
          (project) => project.id == idProject
        );
        if (targetProject) {
          const { tasks } = targetProject;
          tasks[newTask.status].push(newTask);
        }
      });
      return nextState;
    }
    case ActionTypes.PUT_TASK: {
      const nextState = produce(state, (draft) => {
        const { task, idProject, idTask } = action.payload;
        const targetProject = draft.projects.find(
          (project) => project.id == idProject
        );

        if (targetProject) {
          let list: keyof ITasks;
          for (list in targetProject.tasks) {
            const taskIndex = targetProject.tasks[list].findIndex(
              (task) => task.id == idTask
            );
            if (taskIndex >= 0) {
              if (task.status == list) {
                targetProject.tasks[list].splice(taskIndex, 1, task);
              } else {
                targetProject.tasks[list].splice(taskIndex, 1);
                targetProject.tasks[task.status].push(task);
              }

              break;
            }
          }
        }
      });
      return nextState;
    }
    case ActionTypes.ADD_COMMENT: {
      const nextState = produce(state, (draft) => {
        const { comment, idProject, task } = action.payload;
        const targetProject = draft.projects.find(
          (project) => project.id == idProject
        );
        if (targetProject) {
          const targetTask = targetProject.tasks[task.status].find(
            (curTask) => curTask.id == task.id
          );
          if (targetTask) {
            targetTask.comments.push(comment);
          }
        }
      });
      return nextState;
    }

    case ActionTypes.SUB_ADD_COMMENT: {
      const nextState = produce(state, (draft) => {
        const { comment, idProject, idComment, task } = action.payload;
        const targetProject = draft.projects.find(
          (project) => project.id == idProject
        );
        if (targetProject) {
          const targetTask = targetProject.tasks[task.status].find(
            (curTask) => curTask.id == task.id
          );
          if (targetTask) {
            const { comments } = targetTask;
            const queue = [...comments];
            while (queue.length > 0) {
              const firstComment = queue[0];
              if (firstComment.id == idComment) {
                firstComment.subComments.push(comment);
                break;
              } else {
                queue.push(...firstComment.subComments);
              }
              queue.shift();
            }
          }
        }
      });
      return nextState;
    }
    case ActionTypes.ADD_SUBTASK: {
      const nextState = produce(state, (draft) => {
        const { idProject, task, subtask } = action.payload;
        const targetProject = draft.projects.find(
          (project) => project.id == idProject
        );
        if (targetProject) {
          const targetTask = targetProject.tasks[task.status].find(
            (curTask) => curTask.id == task.id
          );
          if (targetTask) {
            targetTask.subtasks.push(subtask);
          }
        }
      });

      return nextState;
    }
    case ActionTypes.ADD_FILES: {
      const nextState = produce(state, (draft) => {
        const { idProject, task, files } = action.payload;
        const targetProject = draft.projects.find(
          (project) => project.id == idProject
        );
        if (targetProject) {
          const targetTask = targetProject.tasks[task.status].find(
            (curTask) => curTask.id == task.id
          );
          if (targetTask) {
            targetTask.files.push(...files);
          }
        }
      });
      return nextState;
    }
    case ActionTypes.SET_PROJECTS: {
      const nextState = produce(state, (draft) => {
        const { projects } = action.payload;
        draft.projects.push(...projects);
      });

      return nextState;
    }
    case ActionTypes.SET_LOAD: {
      const nextState = produce(state, (draft) => {
        const { status } = action.payload;
        draft.isLoading = status;
      });

      return nextState;
    }
    default:
      return state;
  }
}

export default projectsReducer;

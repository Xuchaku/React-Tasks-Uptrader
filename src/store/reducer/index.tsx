import IProject from "../../types/IProject/IPpoject";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";
import Stage from "../../types/Stage/Stage";
import ITask from "../../types/ITask/ITask";
import ITasks from "../../types/ITasks/ITasks";

type ProjectsStore = {
  projects: IProject[];
};

enum ActionTypes {
  MOVE_TASK,
  ADD_TASK,
  PUT_TASK,
}

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

type TaskAction = TaskMoveAction | TaskAddAction | TaskPutAction;

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

const initialState: ProjectsStore = {
  projects: [
    {
      name: "Project 1",
      id: uuidv4(),
      tasks: {
        queue: [
          {
            id: uuidv4(),
            indexNumber: 0,
            title: "Some title",
            description:
              "Some description Some descriptionSome descriptionSome descriptionSome descriptionSome descriptionSome descriptionSome descriptionSome descriptionSome descriptionSome description",
            createAt: new Date(),
            timeWork: 173,
            endDate: new Date(),
            priority: "high",
            files: ["asjdf.jpg"],
            status: "queue",
            subtasks: [
              {
                id: uuidv4(),
                title: "Subtask 1",
                indexNumber: 0,
                description: "some descirption subtask",
                createAt: new Date(),
                timeWork: 1235243,
                endDate: new Date(),
                priority: "high",
                status: "queue",
              },
            ],
            comments: [
              {
                name: "Julia",
                text: "Some comments lalala",
                createAt: new Date(),
                subComments: [
                  {
                    name: "Julia",
                    text: "Some comments lalala",
                    createAt: new Date(),
                    subComments: [
                      {
                        name: "Julia",
                        text: "Some comments lalala",
                        createAt: new Date(),
                        subComments: [],
                      },
                    ],
                  },
                  {
                    name: "Julia",
                    text: "Some comments lalala",
                    createAt: new Date(),
                    subComments: [],
                  },
                ],
              },
            ],
          },
        ],
        development: [
          {
            id: uuidv4(),
            indexNumber: 0,
            title: "Some title",
            description: "Some description",
            createAt: new Date(),
            timeWork: 173888,
            endDate: new Date(),
            priority: "high",
            files: ["asjdf.jpg"],
            status: "development",
            subtasks: [],
            comments: [],
          },
          {
            id: uuidv4(),
            indexNumber: 1,
            title: "Some title",
            description: "Some description",
            createAt: new Date(),
            timeWork: 173888,
            endDate: new Date(),
            priority: "high",
            files: ["asjdf.jpg", "2333.jpg"],
            status: "development",
            subtasks: [],
            comments: [],
          },
          {
            id: uuidv4(),
            indexNumber: 2,
            title: "Some title",
            description: "Some description",
            createAt: new Date(),
            timeWork: 1738880000,
            endDate: new Date(),
            priority: "high",
            files: [],
            status: "development",
            subtasks: [],
            comments: [],
          },
        ],
        done: [],
      },
    },
  ],
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
            tasks[toColumnId].splice(toIndexTask, 0, targetTask);
          }
        }
      });
      return nextState;
    }
    case ActionTypes.ADD_TASK: {
      const nextState = produce(state, (draft) => {
        const { task: newTask, idProject } = action.payload;
        const targetProject = state.projects.find(
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
    default:
      return state;
  }
}

export default projectsReducer;

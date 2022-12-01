import produce from "immer";
import ITasks from "../../types/ITasks/ITasks";
import { v4 as uuidv4 } from "uuid";
import ProjectsStore from "../../types/ProjectStore/ProjectStore";
import { ActionTypes } from "../../types/ActionTypes/ActionTypes";
import { TaskAction } from "../../types/ActionCreatorsTypes/ActionCreatorsTypes";

const initialState: ProjectsStore = {
  isLoading: false,
  projects: [],
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
        console.log("here red");
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

import dayjs from "dayjs";
import ITask from "../types/ITask/ITask";
import { v4 as uuidv4 } from "uuid";
import IComment from "../types/IComment/IComment";
import ISubtask from "../types/ISubtask/ISubtask";
import IProject from "./../types/IProject/IPpoject";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import produce from "immer";
import ITasks from "../types/ITasks/ITasks";

export const isValidText = function (value: string) {
  return !!value;
};

export const classes = (...args: (string | undefined)[]) => {
  return args.join(" ");
};
export const isValidDate = function (value: string) {
  return !!(value && dayjs(value).isValid());
};

export const parseDate = function (value: string) {
  const year = Number(dayjs(value).format("YYYY"));
  const month = Number(dayjs(value).format("MM"));
  const day = Number(dayjs(value).format("DD"));
  return { year, month, day };
};

export const initNewTask = (): ITask => {
  return {
    id: uuidv4(),
    indexNumber: Math.floor(Math.random() * 1000),
    title: "",
    description: "",
    createAt: new Date(),
    timeWork: 0,
    endDate: new Date(),
    priority: "low",
    files: [],
    status: "queue",
    comments: [],
    subtasks: [],
  };
};

export const initNewSubTask = (): ISubtask => {
  return {
    id: uuidv4(),
    indexNumber: 0,
    title: "",
    description: "",
    createAt: new Date(),
    timeWork: 0,
    endDate: new Date(),
    priority: "low",
    status: "queue",
  };
};

export const initNewComment = (): IComment => {
  return {
    id: uuidv4(),
    name: "",
    text: "",
    createAt: new Date(),
    subComments: [],
  };
};

export const firebaseConfig = {
  apiKey: "AIzaSyDk-ie-auEWamphq5SnUIfuJsF_e2c9a4U",
  authDomain: "tasks-uptrader.firebaseapp.com",
  projectId: "tasks-uptrader",
  storageBucket: "tasks-uptrader.appspot.com",
  messagingSenderId: "958151112825",
  appId: "1:958151112825:web:7c71e3c4b338ffae64bca8",
};

const transformProjectDate = (project: IProject): IProject => {
  const nextState = produce(project, (draft) => {
    const { tasks } = draft;
    let list: keyof ITasks;
    for (list in tasks) {
      const taskArr = tasks[list] as any;
      const queue = [...taskArr];
      while (queue.length > 0) {
        const elem = queue[0];
        if (elem.createAt) {
          const createAtSec = (elem.createAt as any).seconds as number;
          elem.createAt = new Date(createAtSec * 1000);
        }
        if (elem.endDate) {
          const endDateSec = (elem.endDate as any).seconds as number;
          elem.endDate = new Date(endDateSec * 1000);
        }

        if (elem.subtasks) {
          if (elem.subtasks.length > 0) {
            queue.push(...elem.subtasks);
          }
        }

        if (elem.comments) {
          if (elem.comments.length > 0) {
            queue.push(...elem.comments);
          }
        }
        if (elem.subComments) {
          if (elem.subComments.length > 0) {
            queue.push(...elem.subComments);
          }
        }
        queue.shift();
      }
    }
  });
  return nextState;
};

export const transformToProjects = (
  data: QuerySnapshot<DocumentData>
): IProject[] => {
  const projects: IProject[] = [];

  data.forEach((doc) => {
    const project = doc.data();
    const projectWithTransformDate = transformProjectDate(project as IProject);
    projects.push(projectWithTransformDate as IProject);
  });
  return projects;
};

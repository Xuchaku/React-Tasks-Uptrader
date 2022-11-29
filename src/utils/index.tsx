import dayjs from "dayjs";
import ITask from "../types/ITask/ITask";
import { v4 as uuidv4 } from "uuid";
import IComment from "../types/IComment/IComment";
import ISubtask from "../types/ISubtask/ISubtask";

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
    indexNumber: 0,
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

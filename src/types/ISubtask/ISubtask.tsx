import ITask from "../ITask/ITask";

type ISubtask = Omit<ITask, "files" | "comments" | "subtasks">;
export default ISubtask;

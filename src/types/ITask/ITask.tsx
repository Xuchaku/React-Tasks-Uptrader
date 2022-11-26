import ISubtask from "../ISubtask/ISubtask";
import IComment from "../IComment/IComment";
type ITask = {
  id: string;
  indexNumber: number;
  title: string;
  description: string;
  createAt: Date;
  timeWork: number;
  endDate: Date;
  priority: "high" | "medium" | "low";
  files: string[];
  status: "queue" | "development" | "done";
  comments: IComment[];
  subtasks: ISubtask[];
};

export default ITask;

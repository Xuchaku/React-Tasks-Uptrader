import ISubtask from "../ISubtask/ISubtask";
import IComment from "../IComment/IComment";
import Stage from "../Stage/Stage";
import Priority from "../Priority/Priority";
type ITask = {
  id: string;
  indexNumber: number;
  title: string;
  description: string;
  createAt: Date;
  timeWork: number;
  endDate: Date;
  priority: Priority;
  files: string[];
  status: Stage;
  comments: IComment[];
  subtasks: ISubtask[];
};

export default ITask;

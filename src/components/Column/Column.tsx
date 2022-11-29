import React from "react";
import styles from "./Column.module.scss";
import { Droppable } from "react-beautiful-dnd";
import ITask from "./../../types/ITask/ITask";
import Task from "../Task/Task";
import { hashTableStatusGradient } from "../../constants";
import Stage from "../../types/Stage/Stage";
import Button from "../../UI/Button/Button";
import IComment from "./../../types/IComment/IComment";

type ColumnPropsType = {
  title: Stage;
  addFiles: (files: string[]) => void;
  selectTargetComment: (comment: IComment, task: ITask) => void;
  selectTargetTaskForFiles: (task: ITask) => void;
  selectTargetTask: (task: ITask) => void;
  openFormComment: (task: ITask) => void;
  openFormSubtask: (task: ITask) => void;
  tasks: ITask[];
  selectNewTask: () => void;
};

const Column = ({
  title,
  tasks,
  addFiles,
  selectTargetTask,
  selectTargetTaskForFiles,
  selectNewTask,
  openFormComment,
  selectTargetComment,
  openFormSubtask,
}: ColumnPropsType) => {
  return (
    <div className={styles.WrapperColumn}>
      <h1 style={hashTableStatusGradient[title]}>{title.toUpperCase()}</h1>
      <Droppable key={title} droppableId={title}>
        {(provided, snapshot) => (
          <div
            className={styles.Column}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => {
              return (
                <Task
                  addFiles={addFiles}
                  openFormSubtask={openFormSubtask}
                  selectTargetComment={selectTargetComment}
                  selectTargetTaskForFiles={selectTargetTaskForFiles}
                  openFormComment={openFormComment}
                  selectTargetTask={selectTargetTask}
                  task={task}
                  index={index}
                ></Task>
              );
            })}
          </div>
        )}
      </Droppable>
      <Button onClick={selectNewTask} style={hashTableStatusGradient[title]}>
        Добавить задачу
      </Button>
    </div>
  );
};

export default Column;

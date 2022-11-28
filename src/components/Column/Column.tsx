import React from "react";
import styles from "./Column.module.scss";
import { Droppable } from "react-beautiful-dnd";
import ITask from "./../../types/ITask/ITask";
import Task from "../Task/Task";
import { hashTableStatusGradient } from "../../constants";
import Stage from "../../types/Stage/Stage";

type ColumnPropsType = {
  title: Stage;
  selectTargetTask: (task: ITask) => void;
  tasks: ITask[];
};

const Column = ({ title, tasks, selectTargetTask }: ColumnPropsType) => {
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
                  selectTargetTask={selectTargetTask}
                  task={task}
                  index={index}
                ></Task>
              );
            })}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;

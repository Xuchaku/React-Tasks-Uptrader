import React, { useMemo, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import { hashTableStatusGradient } from "../../constants";

import Stage from "../../types/Stage/Stage";
import ITask from "./../../types/ITask/ITask";

import Button from "../../UI/Button/Button";
import IComment from "./../../types/IComment/IComment";
import Input from "../../UI/Input/Input";
import Task from "../Task/Task";

import styles from "./Column.module.scss";

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
  const [search, setSearch] = useState<string>("");
  function changeSearchHandler(value: string) {
    setSearch(value);
  }
  const filteredTasks = useMemo(() => {
    if (!search) return tasks;
    else {
      return tasks.filter((task) => {
        return (
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          String(task.indexNumber) == search
        );
      });
    }
  }, [search, tasks]);

  return (
    <div className={styles.WrapperColumn}>
      <h1 style={hashTableStatusGradient[title]}>{title.toUpperCase()}</h1>
      <Input
        label=""
        placeholder="Поиск по номеру и названию"
        value={search}
        type={"text"}
        onChange={changeSearchHandler}
      ></Input>
      <Droppable key={title} droppableId={title}>
        {(provided, snapshot) => (
          <div
            className={styles.Column}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filteredTasks.map((task, index) => {
              return (
                <Task
                  key={task.id}
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

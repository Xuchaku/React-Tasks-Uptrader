import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ReactComponent as EditSvg } from "./../../assets/svgs/edit-svgrepo-com.svg";
import { ReactComponent as PrioritySvg } from "./../../assets/svgs/fire-svgrepo-com.svg";
import { ReactComponent as Arrow } from "./../../assets/svgs/up-svgrepo-com.svg";
import { ReactComponent as FileSvg } from "./../../assets/svgs/file-svgrepo-com.svg";
import { ReactComponent as TimerSvg } from "./../../assets/svgs/timer-svgrepo-com.svg";
import File from "../File/File";
import ITask from "../../types/ITask/ITask";
import Comment from "./../Comment/Comment";
import dayjs from "dayjs";
import styles from "./Task.module.scss";
import { hashTablePriority } from "../../constants";
import Button from "../../UI/Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import Subtask from "../Subtask/Subtask";

type TaskPropsType = {
  task: ITask;
  index: number;
  selectTargetTask: (task: ITask) => void;
};

const Task = ({ task, index, selectTargetTask }: TaskPropsType) => {
  const {
    id,
    title,
    createAt,
    description,
    timeWork,
    priority,
    endDate,
    files,
    subtasks,
    comments,
  } = task;
  const [isCollapsed, setIsCollapsed] = useState(true);
  function toggleCollapse() {
    setIsCollapsed(!isCollapsed);
  }
  function selectTaskHandler() {
    selectTargetTask(task);
  }
  return (
    <Draggable draggableId={id} index={index} key={id}>
      {(provided, snapshot) => (
        <div
          className={styles.Task}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={styles.Header}>
            <div className={styles.Main}>
              <h2>{title}</h2>
              <div className={styles.Priority}>
                <PrioritySvg></PrioritySvg>
                <PrioritySvg></PrioritySvg>
                <PrioritySvg></PrioritySvg>
              </div>
            </div>
            <div className={styles.Svgs}>
              <EditSvg onClick={selectTaskHandler}></EditSvg>
            </div>
          </div>
          <div className={styles.Date}>
            <span>
              {dayjs(createAt).format("DD.MM.YYYY")} &#183;{" "}
              {dayjs(endDate).format("DD.MM.YYYY")}
            </span>
          </div>
          <div className={styles.Meta}>
            <div className={styles.Work}>
              <TimerSvg></TimerSvg>
              <span>
                {dayjs(timeWork).format("d")} дней {dayjs(timeWork).format("H")}{" "}
                часов {dayjs(timeWork).format("mm")} минут
              </span>
            </div>
          </div>
          <div className={styles.Description}>
            <p>{description}</p>
          </div>
          <div className={styles.Collapse}>
            <Button onClick={toggleCollapse}>
              <Arrow
                style={{
                  width: 12,
                  height: 12,
                  transition: "0.2s",
                  transform: `rotate(${isCollapsed ? "180deg" : "0deg"})`,
                }}
              ></Arrow>
            </Button>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                style={{ overflow: "hidden" }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className={styles.Collapsed}>
                  {files.length > 0 && (
                    <div className={styles.Files}>
                      <h2>Прикрепленные файлы</h2>
                      <div className={styles.FilesList}>
                        {files.map((file) => {
                          return <File name={file} icon={FileSvg}></File>;
                        })}
                      </div>
                    </div>
                  )}
                  {subtasks.length > 0 && (
                    <div className={styles.Subtasks}>
                      <h2>Подзадачи</h2>
                      {subtasks.map((subtask) => {
                        return <Subtask subtask={subtask}></Subtask>;
                      })}
                      <Button>Добавить подзадачу</Button>
                    </div>
                  )}
                  <div className={styles.Comments}>
                    <h2>Комментарии</h2>
                    {comments.map((comment) => {
                      return <Comment isTop={true} comment={comment}></Comment>;
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                style={{ overflow: "hidden" }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className={styles.Collapsed}>
                  <div className={styles.Comments}>
                    <h2>Комментарии</h2>
                    {comments.map((comment) => {
                      return <Comment isTop={true} comment={comment}></Comment>;
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </Draggable>
  );
};

export default Task;

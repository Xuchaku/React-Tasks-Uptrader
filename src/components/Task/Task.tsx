import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";

import { ReactComponent as EditSvg } from "./../../assets/svgs/edit-svgrepo-com.svg";
import { ReactComponent as Arrow } from "./../../assets/svgs/up-svgrepo-com.svg";
import { ReactComponent as FileSvg } from "./../../assets/svgs/file-svgrepo-com.svg";
import { ReactComponent as TimerSvg } from "./../../assets/svgs/timer-svgrepo-com.svg";
import { ReactComponent as CommentSvg } from "./../../assets/svgs/commenting-svgrepo-com.svg";
import FileBox from "../FileBox/FileBox";
import Comment from "./../Comment/Comment";
import Button from "../../UI/Button/Button";
import Subtask from "../Subtask/Subtask";
import InputFile from "../../UI/InputFile/InputFile";

import ITask from "../../types/ITask/ITask";
import IComment from "../../types/IComment/IComment";

import { prioritySvgs } from "../../constants";

import styles from "./Task.module.scss";
import { collapseVariants } from "../../constants/variants";

type TaskPropsType = {
  task: ITask;
  index: number;
  addFiles: (files: string[]) => void;
  selectTargetComment: (comment: IComment, task: ITask) => void;
  selectTargetTaskForFiles: (task: ITask) => void;
  selectTargetTask: (task: ITask) => void;
  openFormComment: (task: ITask) => void;
  openFormSubtask: (task: ITask) => void;
};

const Task = ({
  task,
  index,
  addFiles,
  selectTargetTask,
  selectTargetTaskForFiles,
  openFormComment,
  selectTargetComment,
  openFormSubtask,
}: TaskPropsType) => {
  const {
    id,
    title,
    createAt,
    description,
    timeWork,
    indexNumber,
    priority,
    endDate,
    files,
    subtasks,
    comments,
  } = task;
  const [isCollapsedFiles, setIsCollapsedFiles] = useState(true);
  const [isCollapsedSubtasks, setIsCollapsedSubtasks] = useState(true);
  const [isCollapsedComments, setIsCollapsedComments] = useState(true);

  const computedStringDate = `${dayjs(createAt).format(
    "DD.MM.YYYY"
  )} ${String.fromCharCode(183)} ${dayjs(endDate).format("DD.MM.YYYY")}`;
  const computedStringWorkTime = `${dayjs(timeWork).format("d")} дней ${dayjs(
    timeWork
  ).format("H")} часов ${dayjs(timeWork).format("mm")} минут`;
  const computedStyleArrowFiles = {
    width: 12,
    height: 12,
    transition: "0.2s",
    transform: `rotate(${isCollapsedFiles ? "180deg" : "0deg"})`,
  };
  const computedStyleArrowSubtasks = {
    width: 12,
    height: 12,
    transition: "0.2s",
    transform: `rotate(${isCollapsedSubtasks ? "180deg" : "0deg"})`,
  };
  const computedStyleArrowComments = {
    width: 12,
    height: 12,
    transition: "0.2s",
    transform: `rotate(${isCollapsedComments ? "180deg" : "0deg"})`,
  };

  function toggleCollapseFiles() {
    setIsCollapsedFiles(!isCollapsedFiles);
  }

  function toggleCollapseSubtasks() {
    setIsCollapsedSubtasks(!isCollapsedSubtasks);
  }

  function toggleCollapseComments() {
    setIsCollapsedComments(!isCollapsedComments);
  }

  function selectTaskFromSubTask() {
    openFormSubtask(task);
  }

  function selectTaskHandler() {
    selectTargetTask(task);
  }

  function selectFilesHandler() {
    selectTargetTaskForFiles(task);
  }

  function selectFiles(files: string[]) {
    addFiles(files);
  }

  function selectTaskForCommentHandler() {
    openFormComment(task);
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
              <div className={styles.Priority}>{prioritySvgs[priority]}</div>
            </div>
            <div className={styles.Svgs}>
              <EditSvg onClick={selectTaskHandler}></EditSvg>
            </div>
          </div>
          <div className={styles.Date}>
            <span>{computedStringDate}</span>
          </div>
          <div className={styles.Meta}>
            <div className={styles.Work}>
              <TimerSvg></TimerSvg>
              <span>{computedStringWorkTime}</span>
            </div>
          </div>
          <div className={styles.Description}>
            <p>{description}</p>
          </div>
          <div className={styles.Collapse}>
            <Button variant="text" onClick={toggleCollapseFiles}>
              <>
                <span>Файлы</span>
                <Arrow style={computedStyleArrowFiles}></Arrow>
              </>
            </Button>
          </div>

          <AnimatePresence>
            {!isCollapsedFiles && (
              <motion.div
                style={{ overflow: "hidden" }}
                variants={collapseVariants}
                initial={"hidden"}
                animate={"visible"}
                exit={"exit"}
              >
                <div className={styles.Collapsed}>
                  {files.length > 0 && (
                    <div className={styles.Files}>
                      <div className={styles.FilesList}>
                        {files.map((file) => {
                          return (
                            <FileBox
                              key={file}
                              name={file}
                              icon={FileSvg}
                            ></FileBox>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <Button onClick={selectFilesHandler}>
                    <InputFile uploadFile={selectFiles}></InputFile>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.Collapse}>
            <Button variant="text" onClick={toggleCollapseSubtasks}>
              <>
                <span>Подзадачи</span>
                <Arrow style={computedStyleArrowSubtasks}></Arrow>
              </>
            </Button>
          </div>

          <AnimatePresence>
            {!isCollapsedSubtasks && (
              <motion.div
                style={{ overflow: "hidden" }}
                variants={collapseVariants}
                initial={"hidden"}
                animate={"visible"}
                exit={"exit"}
              >
                <div className={styles.Collapsed}>
                  <div className={styles.Subtasks}>
                    {subtasks.length > 0 &&
                      subtasks.map((subtask) => {
                        return <Subtask subtask={subtask}></Subtask>;
                      })}
                    <Button onClick={selectTaskFromSubTask}>
                      Добавить подзадачу
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.Collapse}>
            <Button variant="text" onClick={toggleCollapseComments}>
              <>
                <span>Комментарии</span>
                <Arrow style={computedStyleArrowComments}></Arrow>
              </>
            </Button>
          </div>

          <AnimatePresence>
            {!isCollapsedComments && (
              <motion.div
                style={{ overflow: "hidden" }}
                variants={collapseVariants}
                initial={"hidden"}
                animate={"visible"}
                exit={"exit"}
              >
                <div className={styles.Collapsed}>
                  <div className={styles.Comments}>
                    <CommentSvg
                      onClick={selectTaskForCommentHandler}
                    ></CommentSvg>
                    {comments.map((comment) => {
                      return (
                        <Comment
                          selectTargetComment={selectTargetComment}
                          task={task}
                          level={0}
                          isTop={true}
                          comment={comment}
                        ></Comment>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className={styles.IndexNumber}>
            <span>({indexNumber})</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;

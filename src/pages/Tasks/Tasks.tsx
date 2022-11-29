import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Column from "../../components/Column/Column";
import styles from "./Tasks.module.scss";
import Portal from "../../UI/Portal/Portal";
import { useDispatch, useSelector } from "react-redux";
import IProject from "../../types/IProject/IPpoject";
import storeProjects from "../../types/storeProjects/storeProjects";
import ITasks from "../../types/ITasks/ITasks";
import {
  setMovedTask,
  setNewComment,
  setNewFiles,
  setNewSubComment,
  setNewSubtask,
  setNewTask,
  setTaskById,
} from "../../store/reducer";
import Stage from "../../types/Stage/Stage";
import Popup from "../../UI/Popup/Popup";
import FormTask from "../../components/FormTask/FormTask";
import ITask from "../../types/ITask/ITask";
import Button from "../../UI/Button/Button";
import CommentForm from "../../components/CommentForm/CommentForm";
import IComment from "../../types/IComment/IComment";
import FormSubtask from "../../components/FormSubtask/FormSubtask";
import ISubtask from "./../../types/ISubtask/ISubtask";

const containerVariants = {
  hidden: {
    background: "#e7ebf",
    width: 0,
    height: 0,
  },
  visible: {
    background: "#663399",
    width: "100%",
    height: "auto",
    minHeight: "100vh",
    transition: { duration: 1 },
  },
  exit: {
    background: "#ffffff",
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

const divVariants = {
  visible: (delay: number = 0) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 1 + delay,
    },
  }),
  hidden: {
    scale: 0.3,
    opacity: 0,
  },
};

const Tasks = () => {
  let { id: idProject } = useParams();
  const projects = useSelector<storeProjects, IProject[]>(
    (state) => state.projects
  );
  const [targetTask, setTargetTask] = useState<ITask | null>(null);
  const [targetComment, setTargetComment] = useState<IComment | null>(null);
  const dispatch = useDispatch();
  const [isOpenedModalFormSubTask, setIsOpenedModalFormSubTask] =
    useState(false);
  const [isOpenedModalFormTask, setIsOpenedModalFormTask] = useState(false);
  const [isOpenedModalFormComment, setIsOpenedModalFormComment] =
    useState(false);
  const tasks = Object.entries(
    projects.find((project) => project.id == idProject)?.tasks as ITasks
  ) as [Stage, ITask[]][];

  function selectTargetTaskForFiles(task: ITask) {
    setTargetTask(task);
  }

  function selectTargetTask(task: ITask) {
    setTargetTask(task);
    setIsOpenedModalFormTask(true);
  }
  function closeModalFormSubTask() {
    setIsOpenedModalFormSubTask(false);
  }
  function closeModalFormComment() {
    setIsOpenedModalFormComment(false);
    setTargetComment(null);
  }
  function selectTargetComment(comment: IComment, task: ITask) {
    setTargetComment(comment);
    setTargetTask(task);
    setIsOpenedModalFormComment(true);
  }
  function openModalFormComment(task: ITask) {
    setTargetTask(task);
    setIsOpenedModalFormComment(true);
  }
  function openFormSubtask(task: ITask) {
    setTargetTask(task);
    setIsOpenedModalFormSubTask(true);
  }
  function addSubtask(subtask: ISubtask) {
    dispatch(setNewSubtask(idProject as string, targetTask as ITask, subtask));
    setIsOpenedModalFormSubTask(false);
  }
  function addFiles(files: string[]) {
    dispatch(setNewFiles(idProject as string, targetTask as ITask, files));
  }
  function addComment(comment: IComment) {
    if (!targetComment) {
      dispatch(
        setNewComment(idProject as string, targetTask as ITask, comment)
      );
    } else {
      dispatch(
        setNewSubComment(
          idProject as string,
          targetTask as ITask,
          targetComment.id,
          comment
        )
      );
    }
    setTargetComment(null);
    setIsOpenedModalFormComment(false);
  }

  function selectNewTask() {
    setTargetTask(null);
    setIsOpenedModalFormTask(true);
  }
  function closeModalFormTask() {
    setIsOpenedModalFormTask(false);
  }
  function addTask(task: ITask) {
    dispatch(setNewTask(idProject as string, task));
    setIsOpenedModalFormTask(false);
  }

  function changeTask(idTask: string, task: ITask) {
    dispatch(setTaskById(idProject as string, idTask, task));
    setIsOpenedModalFormTask(false);
  }
  function endDragHandler(result: DropResult, provided: ResponderProvided) {
    dispatch(
      setMovedTask(
        idProject as string,
        result.source.droppableId as Stage,
        result.source.index,
        result.destination?.droppableId as Stage,
        result.destination?.index
      )
    );
  }

  return (
    <>
      <Portal>
        <Popup
          isOpened={isOpenedModalFormSubTask}
          onClose={closeModalFormSubTask}
        >
          <FormSubtask addSubtask={addSubtask}></FormSubtask>
        </Popup>
      </Portal>

      <Portal>
        <Popup
          isOpened={isOpenedModalFormComment}
          onClose={closeModalFormComment}
        >
          <CommentForm addComment={addComment}></CommentForm>
        </Popup>
      </Portal>
      <Portal>
        <Popup isOpened={isOpenedModalFormTask} onClose={closeModalFormTask}>
          <FormTask
            changeTask={changeTask}
            addTask={addTask}
            targetTask={targetTask}
          ></FormTask>
        </Popup>
      </Portal>
      <motion.div
        className={styles.Tasks}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className={styles.Back}
          variants={divVariants}
          initial="hidden"
          animate="visible"
        >
          <h1>
            <Link to="/">Назад</Link>
          </h1>
        </motion.div>
        <DragDropContext onDragEnd={endDragHandler}>
          <motion.div
            className={styles.Columns}
            variants={divVariants}
            initial="hidden"
            animate="visible"
            custom={0.5}
          >
            {tasks.map(([name, tasks]) => {
              return (
                <Column
                  selectTargetTaskForFiles={selectTargetTaskForFiles}
                  addFiles={addFiles}
                  openFormSubtask={openFormSubtask}
                  selectTargetComment={selectTargetComment}
                  openFormComment={openModalFormComment}
                  selectTargetTask={selectTargetTask}
                  selectNewTask={selectNewTask}
                  title={name}
                  tasks={tasks}
                ></Column>
              );
            })}
          </motion.div>
        </DragDropContext>
      </motion.div>
    </>
  );
};

export default Tasks;

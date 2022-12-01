import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import {
  putProjectFetch,
  setMovedTask,
  setNewComment,
  setNewFiles,
  setNewSubComment,
  setNewSubtask,
  setNewTask,
  setTaskById,
} from "../../store/ActionCreators";

import Column from "../../components/Column/Column";
import Portal from "../../UI/Portal/Portal";
import Popup from "../../UI/Popup/Popup";
import FormTask from "../../components/FormTask/FormTask";
import FormComment from "../../components/FormComment/FormComment";
import FormSubtask from "../../components/FormSubtask/FormSubtask";

import IProject from "../../types/IProject/IPpoject";
import storeProjects from "../../types/storeProjects/storeProjects";
import ITasks from "../../types/ITasks/ITasks";
import Stage from "../../types/Stage/Stage";
import ITask from "../../types/ITask/ITask";
import IComment from "../../types/IComment/IComment";
import ISubtask from "./../../types/ISubtask/ISubtask";

import { DataBaseContext } from "../../context";

import styles from "./Tasks.module.scss";
import { containerTasksVariants, divVariants } from "../../constants/variants";

const Tasks = () => {
  let { id: idProject } = useParams();
  const projects = useSelector<storeProjects, IProject[]>(
    (state) => state.projects
  );
  const dataBase = useContext(DataBaseContext);
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
    dispatch(putProjectFetch(dataBase, idProject as string));
  }

  function addFiles(files: string[]) {
    dispatch(setNewFiles(idProject as string, targetTask as ITask, files));
    dispatch(putProjectFetch(dataBase, idProject as string));
  }

  function addComment(comment: IComment) {
    if (!targetComment) {
      console.log("hre");
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
    dispatch(putProjectFetch(dataBase, idProject as string));
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
    dispatch(putProjectFetch(dataBase, idProject as string));
  }

  function changeTask(idTask: string, task: ITask) {
    dispatch(setTaskById(idProject as string, idTask, task));
    setIsOpenedModalFormTask(false);
    dispatch(putProjectFetch(dataBase, idProject as string));
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
    dispatch(putProjectFetch(dataBase, idProject as string));
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
          <FormComment addComment={addComment}></FormComment>
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
        variants={containerTasksVariants}
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
                  key={name}
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

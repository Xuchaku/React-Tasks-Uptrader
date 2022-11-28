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
import { setMovedTask, setNewTask, setTaskById } from "../../store/reducer";
import Stage from "../../types/Stage/Stage";
import Popup from "../../UI/Popup/Popup";
import FormTask from "../../components/FormTask/FormTask";
import ITask from "../../types/ITask/ITask";

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
  const dispatch = useDispatch();
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const tasks = Object.entries(
    projects.find((project) => project.id == idProject)?.tasks as ITasks
  ) as [Stage, ITask[]][];

  function selectTargetTask(task: ITask) {
    setTargetTask(task);
    setIsOpenedModal(true);
  }
  function closeModal() {
    setIsOpenedModal(false);
  }
  function addTask(task: ITask) {
    dispatch(setNewTask(idProject as string, task));
    setIsOpenedModal(false);
  }

  function changeTask(idTask: string, task: ITask) {
    dispatch(setTaskById(idProject as string, idTask, task));
    setIsOpenedModal(false);
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
    console.log(result.draggableId, result.source, result.destination);
  }

  return (
    <>
      <Portal>
        <Popup isOpened={isOpenedModal} onClose={closeModal}>
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
                  selectTargetTask={selectTargetTask}
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

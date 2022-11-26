import { motion } from "framer-motion";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Column from "../../components/Column/Column";
import styles from "./Tasks.module.scss";

import { useSelector } from "react-redux";
import IProject from "../../types/IProject/IPpoject";
import storeProjects from "../../types/storeProjects/storeProjects";
import ITasks from "../../types/ITasks/ITasks";

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
  let { id } = useParams();
  const projects = useSelector<storeProjects, IProject[]>(
    (state) => state.projects
  );
  const tasks = Object.entries(
    projects.find((project) => project.id == id)?.tasks as ITasks
  );

  return (
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
      <DragDropContext onDragEnd={() => {}}>
        <motion.div
          className={styles.Columns}
          variants={divVariants}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          {tasks.map(([name, tasks]) => {
            return <Column title={name} tasks={tasks}></Column>;
          })}
        </motion.div>
      </DragDropContext>
    </motion.div>
  );
};

export default Tasks;

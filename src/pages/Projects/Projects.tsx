import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import Project from "../../components/Project/Project";
import IProject from "../../types/IProject/IPpoject";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Projects.module.scss";
import storeProjects from "../../types/storeProjects/storeProjects";

const projectsVariants = {
  visible: (i: number) => {
    return {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1 + i * 0.05,
      },
    };
  },
  hidden: {
    scale: 0.3,
    opacity: 0,
  },
};
const containerVariants = {
  hidden: {
    background: "#e7ebf",
    width: 0,
    height: 0,
    minHeight: 0,
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

const Projects = () => {
  const projects = useSelector<storeProjects, IProject[]>(
    (state) => state.projects
  );

  return (
    <motion.div
      className={styles.Projects}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {projects.map((project, index) => {
        return (
          <Project
            key={project.id}
            name={project.name}
            id={project.id}
            index={index}
            animationVariant={projectsVariants}
          ></Project>
        );
      })}
    </motion.div>
  );
};

export default Projects;

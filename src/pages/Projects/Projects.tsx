import { motion } from "framer-motion";
import React from "react";
import Project from "../../components/Project/Project";
import styles from "./Projects.module.scss";

const projectsVariants = {
  visible: (i: number) => {
    return {
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.05,
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
    background: "#ff0000",
  },
  visible: {
    background: "#0000ff",
    transition: { duration: 2 },
  },
  exit: {
    background: "#ff0000",
    transition: { duration: 2 },
  },
};

const Projects = () => {
  const projects = [
    { name: "First", id: 1 },
    { name: "Two", id: 2 },
    { name: "Two", id: 3 },
    { name: "Two", id: 4 },
    { name: "Two", id: 5 },
    { name: "Two", id: 6 },

    { name: "Two", id: 7 },
    { name: "Two", id: 8 },
    { name: "Two", id: 9 },
    { name: "Two", id: 10 },
  ];
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
            index={index}
            animationVariant={projectsVariants}
          ></Project>
        );
      })}
    </motion.div>
  );
};

export default Projects;

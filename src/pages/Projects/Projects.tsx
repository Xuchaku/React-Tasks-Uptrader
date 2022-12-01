import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import Project from "../../components/Project/Project";

import storeProjects from "../../types/storeProjects/storeProjects";

import styles from "./Projects.module.scss";
import {
  containerProjectsVariants,
  projectsVariants,
} from "../../constants/variants";

const Projects = () => {
  const { projects } = useSelector<storeProjects, storeProjects>(
    (state) => state
  );

  return (
    <motion.div
      className={styles.Projects}
      variants={containerProjectsVariants}
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

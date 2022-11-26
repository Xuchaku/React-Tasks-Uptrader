import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Project.module.scss";

type ProjectTypeProps = {
  name: string;
  index: number;
  id: string;
  animationVariant: any;
};

const Project = ({ name, animationVariant, index, id }: ProjectTypeProps) => {
  return (
    <motion.div
      variants={animationVariant}
      initial={"hidden"}
      animate={"visible"}
      custom={index}
    >
      <Link to={`/tasks/${id}`}>
        <motion.div className={styles.Project} whileHover={{ scale: 1.1 }}>
          <h1>{name}</h1>
          <Link to={`/tasks/${id}`}>Перейти к задачам</Link>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default Project;

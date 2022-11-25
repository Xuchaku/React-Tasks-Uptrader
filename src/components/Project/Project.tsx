import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Project.module.scss";

type ProjectTypeProps = {
  name: string;
  index: number;
  animationVariant: any;
};

const Project = ({ name, animationVariant, index }: ProjectTypeProps) => {
  return (
    <motion.div
      className={styles.Project}
      variants={animationVariant}
      initial={"hidden"}
      animate={"visible"}
      custom={index}
    >
      <h1>{name}</h1>
      <Link to="/tasks">Перейти к задачам</Link>
    </motion.div>
  );
};

export default Project;

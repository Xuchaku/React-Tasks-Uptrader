import { motion } from "framer-motion";
import React from "react";
import {
  containerErrorPageVariants,
  errorVariants,
} from "../../constants/variants";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  return (
    <motion.div
      variants={containerErrorPageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={styles.ErrorPage}
    >
      <motion.span
        variants={errorVariants}
        initial={"hidden"}
        animate={"visible"}
      >
        NOT FOUND
      </motion.span>
    </motion.div>
  );
};

export default ErrorPage;

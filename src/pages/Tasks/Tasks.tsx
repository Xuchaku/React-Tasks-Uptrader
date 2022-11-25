import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const variantsContainer = {
  hidden: { background: "#ff0000" },
  visible: { background: "#0000ff", transition: { duration: 2 } },
  exit: { background: "#ff0000", transition: { duration: 2 } },
};

const Tasks = () => {
  return (
    <motion.div
      variants={variantsContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      Tasks
      <Link to="/">Projects</Link>
    </motion.div>
  );
};

export default Tasks;

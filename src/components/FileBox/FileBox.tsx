import React, { FunctionComponent, SVGProps } from "react";
import { motion } from "framer-motion";

import { ReactComponent as DeleteSvg } from "./../../assets/svgs/delete-svgrepo-com.svg";

import styles from "./FileBox.module.scss";
import { fileBoxVariants } from "../../constants/variants";

type FileBoxPropsType = {
  name: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  action?: (() => void) | undefined;
};

const FileBox = ({ name, icon: Svg, action = undefined }: FileBoxPropsType) => {
  const computedStyle = { cursor: "pointer" };
  return (
    <motion.div
      variants={fileBoxVariants}
      initial={"hidden"}
      animate={"visible"}
      className={styles.File}
    >
      <Svg></Svg>
      <span>{name}</span>
      {action && <DeleteSvg style={computedStyle} onClick={action}></DeleteSvg>}
    </motion.div>
  );
};

export default FileBox;

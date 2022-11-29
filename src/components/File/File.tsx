import React, { FunctionComponent, SVGProps } from "react";
import styles from "./Custom.module.scss";
import { ReactComponent as DeleteSvg } from "./../../assets/svgs/delete-svgrepo-com.svg";
import { AnimatePresence, motion } from "framer-motion";

type FilePropsType = {
  name: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  action?: (() => void) | undefined;
};

const File = ({ name, icon: Svg, action = undefined }: FilePropsType) => {
  return (
    <motion.div
      initial={{ scale: 0.2 }}
      animate={{ scale: 1 }}
      className={styles.File}
    >
      <Svg></Svg>
      <div>{name}</div>
      {action && (
        <DeleteSvg style={{ cursor: "pointer" }} onClick={action}></DeleteSvg>
      )}
    </motion.div>
  );
};

export default File;

import { AnimatePresence, motion } from "framer-motion";
import React, { ReactElement } from "react";
import { popupVariants } from "../../constants/variants";
import Portal from "../Portal/Portal";
import styles from "./Popup.module.scss";

type PopupPropsType = {
  children: null | string | ReactElement;
  onClose: () => void;
  isOpened: boolean;
};

const Popup = ({ children, onClose, isOpened }: PopupPropsType) => {
  return (
    <AnimatePresence>
      {isOpened && (
        <Portal>
          <motion.div
            variants={popupVariants}
            initial={"hidden"}
            animate={"visible"}
            exit={"exit"}
            className={styles.Popup}
          >
            <div className={styles.Overlay} onClick={onClose}></div>
            <motion.div exit={{ left: 0 }} className={styles.Content}>
              {children}
            </motion.div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default Popup;

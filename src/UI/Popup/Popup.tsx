import React, { ReactElement } from "react";
import Portal from "../Portal/Portal";
import styles from "./Popup.module.scss";

type PopupPropsType = {
  children: null | string | ReactElement;
  onClose: () => void;
  isOpened: boolean;
};

const Popup = ({ children, onClose, isOpened }: PopupPropsType) => {
  if (!isOpened) return null;
  return (
    <Portal>
      <div className={styles.Popup}>
        <div className={styles.Overlay} onClick={onClose}></div>
        <div className={styles.Content}>{children}</div>
      </div>
    </Portal>
  );
};

export default Popup;

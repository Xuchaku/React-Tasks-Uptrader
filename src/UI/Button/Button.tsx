import React, { ReactElement } from "react";

import styles from "./Button.module.scss";

type ButtonPropsType = {
  children: number | string | ReactElement | null;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
};

const Button = ({
  children,
  onClick,
  disabled = false,
  type = "button",
}: ButtonPropsType) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles.Button}
    >
      {children}
    </button>
  );
};

export default Button;

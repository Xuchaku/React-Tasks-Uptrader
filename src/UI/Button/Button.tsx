import React, { ReactElement } from "react";
import { classes } from "../../utils";

import styles from "./Button.module.scss";

type ButtonPropsType = {
  children: number | string | ReactElement | null;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "text" | "contained" | "outlined";
  type?: "button" | "submit";
  style?: any;
};

const Button = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  variant = "contained",
  style = {},
}: ButtonPropsType) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={classes(styles.Button, styles[variant])}
    >
      {children}
    </button>
  );
};

export default Button;

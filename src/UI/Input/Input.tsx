import React, { ChangeEvent, forwardRef, useId, useState } from "react";
import { FocusEvent } from "react";

import { classes } from "../../utils";

import styles from "./Input.module.scss";

type InputTypeProps = {
  label: string;
  value: string;
  type: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => boolean;
  placeholder: string;
  messageError?: string;
};

const Input = forwardRef<HTMLInputElement, InputTypeProps>(
  (
    {
      value,
      type,
      onChange,
      onBlur,
      placeholder,
      messageError = "Поле не должно быть пустым",
      label,
    },
    ref
  ) => {
    const [isValidSelf, setIsValidSelf] = useState(true);
    const id = useId();
    const extendClasses = isValidSelf
      ? [styles.Input]
      : [styles.Input, styles.Error];

    function handlerChange(event: ChangeEvent<HTMLInputElement>) {
      onChange(event.target.value);
    }

    function handlerBlur(event: FocusEvent<HTMLInputElement>) {
      if (onBlur) {
        const isValid = onBlur(event.target.value);
        if (!isValid) {
          setIsValidSelf(false);
        } else {
          setIsValidSelf(true);
        }
      }
    }

    return (
      <div className={styles.ContainerInput}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          placeholder={placeholder}
          className={classes(...extendClasses)}
          ref={ref}
          value={value}
          onBlur={handlerBlur}
          onChange={handlerChange}
          type={type}
        />
        {!isValidSelf && <p>{messageError}</p>}
      </div>
    );
  }
);

export default Input;

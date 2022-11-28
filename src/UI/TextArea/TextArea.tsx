import React, { ChangeEvent, useState } from "react";
import styles from "./TextArea.module.scss";
import { FocusEvent } from "react";
import { classes } from "../../utils";

type TextAreaPropsType = {
  value: string;
  messageError?: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => boolean;
  placeholder: string;
};

const TextArea = ({
  value,
  messageError = "Поле не должно быть пустым",
  placeholder,
  onChange,
  onBlur,
}: TextAreaPropsType) => {
  const [isValidSelf, setIsValidSelf] = useState(true);

  const extendClasses = isValidSelf
    ? [styles.TextArea]
    : [styles.TextArea, styles.Error];

  function handlerChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value);
  }

  function handlerBlur(event: FocusEvent<HTMLTextAreaElement>) {
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
    <div className={styles.ContainerTextArea}>
      <textarea
        onChange={handlerChange}
        onBlur={handlerBlur}
        placeholder={placeholder}
        className={classes(...extendClasses)}
        value={value}
      ></textarea>
      {!isValidSelf && <p>{messageError}</p>}
    </div>
  );
};

export default TextArea;

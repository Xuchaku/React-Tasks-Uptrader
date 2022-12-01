import React, { useState } from "react";

import { initNewComment, isValidText } from "../../utils";

import IComment from "../../types/IComment/IComment";

import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

import styles from "./FormComment.module.scss";

type FormCommentPropsType = {
  addComment: (comment: IComment) => void;
};

const FormComment = ({ addComment }: FormCommentPropsType) => {
  const [comment, setComment] = useState(() => initNewComment());

  function changeFieldText(field: keyof IComment) {
    return function (value: string) {
      setComment({ ...comment, [field]: value });
    };
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addComment(comment);
  }

  return (
    <form onSubmit={submitForm} className={styles.Form}>
      <Input
        label={"Имя"}
        type="text"
        value={comment.name}
        onChange={changeFieldText("name")}
        onBlur={isValidText}
        placeholder="Введите комментарий..."
      ></Input>
      <Input
        label={"Комментарий"}
        type="text"
        onBlur={isValidText}
        value={comment.text}
        onChange={changeFieldText("text")}
        placeholder="Введите комментарий..."
      ></Input>
      <Button type="submit">Ок</Button>
    </form>
  );
};

export default FormComment;

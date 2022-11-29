import React, { useState } from "react";
import IComment from "../../types/IComment/IComment";
import { ReactComponent as AvatarSvg } from "./../../assets/svgs/avatar-svgrepo-com.svg";
import styles from "./Comment.module.scss";
import dayjs from "dayjs";
import Button from "../../UI/Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import Input from "../../UI/Input/Input";
import CommentForm from "../CommentForm/CommentForm";
import ITask from "../../types/ITask/ITask";

type CommentTypeProps = {
  comment: IComment;
  isTop?: boolean;
  level: number;
  task: ITask;
  selectTargetComment: (comment: IComment, task: ITask) => void;
  // openFormComment: (task: ITask, idComment: string) => void;
};

const Comment = ({
  comment,
  isTop = false,
  level,
  task,
  selectTargetComment,
}: // openFormComment,
CommentTypeProps) => {
  const [isCollapsedSubcomments, setIsCollapsedSubcomments] = useState(true);
  // const [isCollapsedInput, setIsCollapsedInput] = useState(true);
  const { name, text, createAt, subComments } = comment;
  function toggleCollapseSubcomments() {
    setIsCollapsedSubcomments(!isCollapsedSubcomments);
  }
  function openModalFormComment() {
    selectTargetComment(comment, task);
  }
  // function openModalFormComment() {
  //   openFormComment(task, comment.id);
  // }
  // function toggleCollapseInput() {
  //   setIsCollapsedInput(!isCollapsedInput);
  // }
  return (
    <>
      <motion.div
        className={styles.Comment}
        style={{ overflow: "hidden", marginLeft: level * 16 }}
        initial={{ opacity: isTop ? 1 : 0, height: isTop ? "auto" : 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
      >
        <div className={styles.Profile}>
          <AvatarSvg></AvatarSvg>
        </div>
        <div className={styles.Content}>
          <h2>{name}</h2>
          <span>{dayjs(createAt).format("DD.MM.YYYY")}</span>
          <p>{text}</p>
          <div className={styles.Actions}>
            <Button
              variant={"text"}
              onClick={toggleCollapseSubcomments}
            >{`${subComments.length} комментариев`}</Button>
            <Button onClick={openModalFormComment} variant={"text"}>
              Ответить
            </Button>
          </div>
          {/* <AnimatePresence initial={false}>
           {!isCollapsedInput && <CommentForm></CommentForm>}
          </AnimatePresence> */}
        </div>
      </motion.div>
      <AnimatePresence initial={false}>
        {!isCollapsedSubcomments &&
          subComments.map((subcomment) => {
            return (
              <Comment
                selectTargetComment={selectTargetComment}
                task={task}
                level={level + 1}
                comment={subcomment}
              ></Comment>
            );
          })}
      </AnimatePresence>
    </>
  );
};

export default Comment;

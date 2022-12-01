import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dayjs from "dayjs";

import IComment from "../../types/IComment/IComment";
import ITask from "../../types/ITask/ITask";

import { ReactComponent as AvatarSvg } from "./../../assets/svgs/avatar-svgrepo-com.svg";
import Button from "../../UI/Button/Button";
import { commentVariants } from "../../constants/variants";

import styles from "./Comment.module.scss";

type CommentTypeProps = {
  comment: IComment;
  isTop?: boolean;
  level: number;
  task: ITask;
  selectTargetComment: (comment: IComment, task: ITask) => void;
};

const Comment = ({
  comment,
  isTop = false,
  level,
  task,
  selectTargetComment,
}: CommentTypeProps) => {
  const [isCollapsedSubcomments, setIsCollapsedSubcomments] = useState(true);

  const { name, text, createAt, subComments } = comment;
  const dateStart = dayjs(createAt).format("DD.MM.YYYY");
  const computedStyles = { overflow: "hidden", marginLeft: level * 16 };
  function toggleCollapseSubcomments() {
    setIsCollapsedSubcomments(!isCollapsedSubcomments);
  }

  function openModalFormComment() {
    selectTargetComment(comment, task);
  }

  return (
    <>
      <motion.div
        className={styles.Comment}
        style={computedStyles}
        variants={commentVariants}
        initial={"hidden"}
        animate={"visible"}
        exit={"exit"}
        custom={isTop}
      >
        <div className={styles.Profile}>
          <AvatarSvg></AvatarSvg>
        </div>
        <div className={styles.Content}>
          <h2>{name}</h2>
          <span>{dateStart}</span>
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
        </div>
      </motion.div>
      <AnimatePresence initial={false}>
        {!isCollapsedSubcomments &&
          subComments.map((subcomment) => {
            return (
              <Comment
                key={subcomment.id}
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

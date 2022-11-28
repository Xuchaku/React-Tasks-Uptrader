import React, { useState } from "react";
import IComment from "../../types/IComment/IComment";
import { ReactComponent as AvatarSvg } from "./../../assets/svgs/avatar-svgrepo-com.svg";
import styles from "./Comment.module.scss";
import dayjs from "dayjs";
import Button from "../../UI/Button/Button";
import { AnimatePresence, motion } from "framer-motion";

type CommentTypeProps = {
  comment: IComment;
  isTop?: boolean;
};

const Comment = ({ comment, isTop = false }: CommentTypeProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { name, text, createAt, subComments } = comment;
  function toggleCollapse() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <>
      <motion.div
        className={styles.Comment}
        style={{ overflow: "hidden" }}
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
              onClick={toggleCollapse}
            >{`${subComments.length} комментариев`}</Button>
            <Button>Ответить</Button>
          </div>
        </div>
      </motion.div>
      <AnimatePresence initial={false}>
        {!isCollapsed &&
          subComments.map((subcomment) => {
            return <Comment comment={subcomment}></Comment>;
          })}
      </AnimatePresence>
    </>
  );
};

export default Comment;

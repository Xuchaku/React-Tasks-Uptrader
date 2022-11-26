import React from "react";
import styles from "./Column.module.scss";
import ITask from "./../../types/ITask/ITask";

type ColumnPropsType = {
  title: string;
  tasks: ITask[];
};

const Column = ({ title, tasks }: ColumnPropsType) => {
  return (
    <div className={styles.Column}>
      <h1>{title.toUpperCase()}</h1>
    </div>
  );
};

export default Column;

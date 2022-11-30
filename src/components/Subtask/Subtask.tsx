import React from "react";
import ISubtask from "../../types/ISubtask/ISubtask";
import styles from "./Subtask.module.scss";
import { ReactComponent as PrioritySvg } from "./../../assets/svgs/fire-svgrepo-com.svg";
import dayjs from "dayjs";
import { ReactComponent as TimerSvg } from "./../../assets/svgs/timer-svgrepo-com.svg";
import {
  hashTablePriority,
  hashTableStatusGradient,
  prioritySvgs,
} from "../../constants";

type SubtaskTypeProps = {
  subtask: ISubtask;
};

const Subtask = ({ subtask }: SubtaskTypeProps) => {
  const {
    id,
    indexNumber,
    title,
    description,
    createAt,
    timeWork,
    endDate,
    priority,
    status,
  } = subtask;
  return (
    <div className={styles.Subtask}>
      <div className={styles.Header}>
        <div className={styles.Main}>
          <h2>{title}</h2>
          <div className={styles.Priority}>{prioritySvgs[priority]}</div>
        </div>
        <div
          className={styles.Status}
          style={hashTableStatusGradient[status]}
        ></div>
      </div>
      <div className={styles.Date}>
        <span>
          {dayjs(createAt).format("DD.MM.YYYY")} &#183;{" "}
          {dayjs(endDate).format("DD.MM.YYYY")}
        </span>
      </div>
      <div className={styles.Meta}>
        <div className={styles.Work}>
          <TimerSvg></TimerSvg>
          <span>
            {dayjs(timeWork).format("d")} дней {dayjs(timeWork).format("H")}{" "}
            часов {dayjs(timeWork).format("mm")} минут
          </span>
        </div>
      </div>
      <div className={styles.Description}>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Subtask;

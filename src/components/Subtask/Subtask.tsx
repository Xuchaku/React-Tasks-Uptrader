import React from "react";
import dayjs from "dayjs";

import ISubtask from "../../types/ISubtask/ISubtask";

import { ReactComponent as TimerSvg } from "./../../assets/svgs/timer-svgrepo-com.svg";
import { hashTableStatusGradient, prioritySvgs } from "../../constants";

import styles from "./Subtask.module.scss";

type SubtaskTypeProps = {
  subtask: ISubtask;
};

const Subtask = ({ subtask }: SubtaskTypeProps) => {
  const { title, description, createAt, timeWork, endDate, priority, status } =
    subtask;
  const computedStringDate = `${dayjs(createAt).format(
    "DD.MM.YYYY"
  )} ${String.fromCharCode(183)} ${dayjs(endDate).format("DD.MM.YYYY")}`;
  const computedStringWorkTime = `${dayjs(timeWork).format("d")} дней ${dayjs(
    timeWork
  ).format("H")} часов ${dayjs(timeWork).format("mm")} минут`;
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
        <span>{computedStringDate}</span>
      </div>
      <div className={styles.Meta}>
        <div className={styles.Work}>
          <TimerSvg></TimerSvg>
          <span>{computedStringWorkTime}</span>
        </div>
      </div>
      <div className={styles.Description}>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Subtask;

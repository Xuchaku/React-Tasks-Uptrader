import React, { useState } from "react";
import dayjs from "dayjs";

import { priorityRadios, statusRadios } from "../../constants";
import {
  classes,
  initNewTask,
  isValidDate,
  isValidText,
  parseDate,
} from "../../utils";
import { ReactComponent as FileSvg } from "./../../assets/svgs/file-svgrepo-com.svg";
import Button from "../../UI/Button/Button";
import TextArea from "../../UI/TextArea/TextArea";
import InputFile from "../../UI/InputFile/InputFile";
import Input from "../../UI/Input/Input";
import Radios from "../../UI/Radios/Radios";
import FileBox from "../FileBox/FileBox";

import ITask from "../../types/ITask/ITask";

import styles from "./FormTask.module.scss";

type FormTaskPropsType = {
  addTask: (todo: ITask) => void;
  targetTask: ITask | null;
  changeTask: (id: string, changedTask: ITask) => void;
};

const FormTask = ({ targetTask, changeTask, addTask }: FormTaskPropsType) => {
  const [task, setTask] = useState(targetTask || initNewTask());
  const [preDateStartString, setPreDateStartString] = useState(
    dayjs(task.createAt).format("YYYY.MM.DD")
  );
  const [preDateEndString, setPreDateEndString] = useState(
    dayjs(task.endDate).format("YYYY.MM.DD")
  );

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (targetTask) {
      changeTask(task.id, task);
    } else {
      addTask(task);
    }
  }

  function changeFieldText(field: keyof ITask) {
    return function (value: string) {
      setTask({ ...task, [field]: value });
    };
  }

  function changeFieldFiles(field: "files") {
    return function (value: string[]) {
      setTask({ ...task, [field]: [...task.files, ...value] });
    };
  }

  function deleteFile(fileName: string) {
    return function () {
      const filteredFiles = [...task.files].filter((file) => file != fileName);
      setTask({ ...task, files: filteredFiles });
    };
  }

  function changeFieldDateAsString(
    fieldDate: "createAt" | "endDate",
    set: React.Dispatch<React.SetStateAction<string>>
  ) {
    return function (value: string) {
      set(value);
      if (isValidDate(value)) {
        const { year, month, day } = parseDate(value);
        setTask({ ...task, [fieldDate]: new Date(year, month - 1, day) });
      }
    };
  }

  return (
    <form onSubmit={submitForm} className={styles.FormTodo}>
      <div className={styles.FormElement}>
        <Input
          label={"Название"}
          placeholder={"Введите название задачи"}
          type={"text"}
          value={task.title}
          onChange={changeFieldText("title")}
          onBlur={isValidText}
        ></Input>
      </div>
      <div className={styles.FormElement}>
        <Radios
          label="Приоритет"
          initialValue={task.priority}
          onChange={changeFieldText("priority")}
          name="priority"
          variants={priorityRadios}
        ></Radios>
      </div>
      <div className={styles.FormElement}>
        <Radios
          label="Статус"
          initialValue={task.status}
          onChange={changeFieldText("status")}
          name="status"
          variants={statusRadios}
        ></Radios>
      </div>
      <div className={styles.FormElement}>
        <Input
          label={"Дата начала"}
          messageError={"Дата должна соответствовать формату YYYY.MM.DD"}
          placeholder={"Введите дату начала"}
          type={"text"}
          value={preDateStartString}
          onChange={changeFieldDateAsString("createAt", setPreDateStartString)}
          onBlur={isValidDate}
        ></Input>
      </div>
      <div className={styles.FormElement}>
        <Input
          label={"Дата конца"}
          messageError={"Дата должна соответствовать формату YYYY.MM.DD"}
          placeholder={"Введите дату окончания"}
          type={"text"}
          value={preDateEndString}
          onChange={changeFieldDateAsString("endDate", setPreDateEndString)}
          onBlur={isValidDate}
        ></Input>
      </div>
      <div className={styles.FormElement}>
        <TextArea
          label={"Описание"}
          placeholder={"Введите описание"}
          value={task.description}
          onChange={changeFieldText("description")}
          onBlur={isValidText}
        ></TextArea>
      </div>
      <div className={classes(styles.FormElement, styles.Files)}>
        {task.files.map((file) => {
          return (
            <div className={styles.File} key={file}>
              <FileBox
                name={file}
                icon={FileSvg}
                action={deleteFile(file)}
              ></FileBox>
            </div>
          );
        })}
        <InputFile uploadFile={changeFieldFiles("files")}></InputFile>
      </div>
      <Button type="submit">Сохранить</Button>
    </form>
  );
};

export default FormTask;

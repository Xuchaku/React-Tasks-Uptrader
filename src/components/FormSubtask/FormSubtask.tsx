import React, { useState } from "react";
import styles from "./FormSubtask.module.scss";
import ISubtask from "./../../types/ISubtask/ISubtask";
import {
  initNewSubTask,
  isValidDate,
  isValidText,
  parseDate,
} from "../../utils";
import Input from "../../UI/Input/Input";
import Radios from "../../UI/Radios/Radios";
import { priorityRadios, statusRadios } from "../../constants";
import dayjs from "dayjs";
import TextArea from "../../UI/TextArea/TextArea";
import Button from "../../UI/Button/Button";

type FormSubtaskPropsType = {
  addSubtask: (subtask: ISubtask) => void;
};

const FormSubtask = ({ addSubtask }: FormSubtaskPropsType) => {
  const [subtask, setSubtask] = useState(initNewSubTask());
  const [preDateStartString, setPreDateStartString] = useState(
    dayjs(subtask.createAt).format("YYYY.MM.DD")
  );
  const [preDateEndString, setPreDateEndString] = useState(
    dayjs(subtask.endDate).format("YYYY.MM.DD")
  );

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addSubtask(subtask);
  }
  function changeFieldText(field: keyof ISubtask) {
    return function (value: string) {
      setSubtask({ ...subtask, [field]: value });
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
        setSubtask({ ...subtask, [fieldDate]: new Date(year, month - 1, day) });
      }
    };
  }
  return (
    <form onSubmit={submitForm} className={styles.Form}>
      <div className={styles.FormElement}>
        <Input
          label={"Название"}
          placeholder={"Введите название задачи"}
          type={"text"}
          value={subtask.title}
          onChange={changeFieldText("title")}
          onBlur={isValidText}
        ></Input>
      </div>
      <div className={styles.FormElement}>
        <Radios
          label="Приоритет"
          initialValue={subtask.priority}
          onChange={changeFieldText("priority")}
          name="priority"
          variants={priorityRadios}
        ></Radios>
      </div>
      <div className={styles.FormElement}>
        <Radios
          label="Статус"
          initialValue={subtask.status}
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
          value={subtask.description}
          onChange={changeFieldText("description")}
          onBlur={isValidText}
        ></TextArea>
      </div>

      <Button type="submit">Сохранить</Button>
    </form>
  );
};

export default FormSubtask;

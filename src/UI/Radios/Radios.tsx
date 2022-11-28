import React, { ChangeEvent, useId, useState } from "react";
import Priority from "../../types/Priority/Priority";
import Stage from "../../types/Stage/Stage";
import styles from "./Radios.module.scss";

type RadiosTypeProps = {
  onChange: (value: string) => void;
  variants: { view: JSX.Element; value: Stage | Priority }[];
  name: string;
  initialValue: Stage | Priority;
};

const Radios = ({
  variants,
  name,
  onChange,
  initialValue,
}: RadiosTypeProps) => {
  const [activeIndex, setActiveIndex] = useState(initialValue);
  function changeRadio(
    event: ChangeEvent<HTMLInputElement>,
    index: Stage | Priority
  ) {
    onChange(event.target.value);
    setActiveIndex(index);
  }
  return (
    <div className={styles.Radios}>
      {variants.map((variant, index) => {
        const id = Math.random().toString();
        return (
          <>
            <input
              type="radio"
              name={name}
              id={id}
              value={variant.value}
              onChange={(event) => changeRadio(event, variant.value)}
            ></input>
            <label
              style={{
                opacity: activeIndex == variant.value ? 1 : 0.5,
              }}
              htmlFor={id}
            >
              {variant.view}
            </label>
          </>
        );
      })}
    </div>
  );
};

export default Radios;

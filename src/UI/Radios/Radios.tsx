import React, { ChangeEvent, useState } from "react";

import Priority from "../../types/Priority/Priority";
import Stage from "../../types/Stage/Stage";

import styles from "./Radios.module.scss";

type RadiosTypeProps = {
  label: string;
  onChange: (value: string) => void;
  variants: { view: JSX.Element; value: Stage | Priority }[];
  name: string;
  initialValue: Stage | Priority;
};

const Radios = ({
  label,
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
      <span>{label}</span>
      {variants.map((variant, index) => {
        const id = Math.random().toString();
        const computedStyle = {
          opacity: activeIndex == variant.value ? 1 : 0.5,
        };
        return (
          <>
            <input
              type="radio"
              name={name}
              id={id}
              value={variant.value}
              onChange={(event) => changeRadio(event, variant.value)}
            ></input>
            <label style={computedStyle} htmlFor={id}>
              {variant.view}
            </label>
          </>
        );
      })}
    </div>
  );
};

export default Radios;

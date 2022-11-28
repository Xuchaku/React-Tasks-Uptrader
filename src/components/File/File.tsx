import React, { FunctionComponent, SVGProps } from "react";
import styles from "./Custom.module.scss";
import { ReactComponent as DeleteSvg } from "./../../assets/svgs/delete-svgrepo-com.svg";

type FilePropsType = {
  name: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  action?: (() => void) | undefined;
};

const File = ({ name, icon: Svg, action = undefined }: FilePropsType) => {
  console.log(styles);
  return (
    <div className={styles.File}>
      <Svg></Svg>
      <div>{name}</div>
      {action && (
        <DeleteSvg style={{ cursor: "pointer" }} onClick={action}></DeleteSvg>
      )}
    </div>
  );
};

export default File;

import dayjs from "dayjs";
import React from "react";
import styles from "./MainInfo.module.scss";

type MainInfoTypeProps = {
  options: any;
};

const MainInfo = ({}) => {
  return (
    <></>
    //     <><div className={styles.Header}>
    //     <div className={styles.Main}>
    //       <h2>{title}</h2>
    //       <div className={styles.Priority}>
    //         <PrioritySvg></PrioritySvg>
    //         <PrioritySvg></PrioritySvg>
    //         <PrioritySvg></PrioritySvg>
    //       </div>
    //     </div>
    //     <div className={styles.Svgs}>
    //       <EditSvg></EditSvg>
    //     </div>
    //   </div>
    //   <div className={styles.Date}>
    //     <span>
    //       {dayjs(createAt).format("DD.MM.YYYY")} &#183;{" "}
    //       {dayjs(endDate).format("DD.MM.YYYY")}
    //     </span>
    //   </div>
    //   <div className={styles.Meta}>
    //     <div className={styles.Work}>
    //       <span>
    //         {dayjs(timeWork).format("d")} дней {dayjs(timeWork).format("H")}{" "}
    //         часов {dayjs(timeWork).format("mm")} минут
    //       </span>
    //     </div>
    //   </div>
    //   <div className={styles.Description}>
    //     <p>{description}</p>
    //   </div></>
  );
};

export default MainInfo;

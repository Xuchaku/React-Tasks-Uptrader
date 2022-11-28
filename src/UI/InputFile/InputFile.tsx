import React, { ChangeEvent, useId } from "react";
import styles from "./InputFile.module.scss";

type InputFileTypeProps = {
  uploadFile: (files: string[]) => void;
};

const InputFile = (props: InputFileTypeProps) => {
  const { uploadFile } = props;

  const id = useId();

  function uploadFilesHandler(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (files) {
      const filesArr: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        filesArr.push(file.name);
      }
      uploadFile(filesArr);
    }
  }

  return (
    <div className={styles.InputFileContainer}>
      <label htmlFor={id}>
        <div>+</div>
      </label>
      <input
        id={id}
        type="file"
        onChange={uploadFilesHandler}
        className={styles.InputFile}
        multiple
      />
    </div>
  );
};

export default InputFile;

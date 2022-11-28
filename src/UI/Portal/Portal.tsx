import { ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Children = {
  children: null | string | ReactElement;
};

const Portal = ({ children }: Children) => {
  const [container] = useState(() => document.createElement("div"));
  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);
  return createPortal(children, container);
};
export default Portal;

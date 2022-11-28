import Priority from "../types/Priority/Priority";
import Stage from "./../types/Stage/Stage";

import { ReactComponent as PrioritySvg } from "./../assets/svgs/fire-svgrepo-com.svg";

export const hashTablePriority = {
  high: { text: "Высокий приоритет", num: 3 },
  medium: { text: "Средний приоритет", num: 2 },
  low: { text: "Низкий приоритет", num: 1 },
};

export const hashTableStatusGradient: { [key in Stage]: any } = {
  queue: { background: "linear-gradient(to left, #ffc666, #faeb18)" },
  development: { background: "linear-gradient(to left, #7466ff, #ba18fa)" },
  done: { background: "linear-gradient(to left, #feff66, #54fa18)" },
};

export const priorityRadios: { view: JSX.Element; value: Priority }[] = [
  {
    view: <PrioritySvg style={{ width: 16, height: 16 }}></PrioritySvg>,
    value: "low",
  },
  {
    view: <PrioritySvg style={{ width: 24, height: 24 }}></PrioritySvg>,
    value: "medium",
  },
  {
    view: <PrioritySvg style={{ width: 32, height: 32 }}></PrioritySvg>,
    value: "high",
  },
];

export const statusRadios: { view: JSX.Element; value: Stage }[] = [
  {
    view: (
      <div
        style={{
          background: "linear-gradient(to left, #ffc666, #faeb18)",
          width: 60,
          height: 20,
          borderRadius: 20,
          border: "2px solid gold",
        }}
      ></div>
    ),
    value: "queue",
  },
  {
    view: (
      <div
        style={{
          background: "linear-gradient(to left, #7466ff, #ba18fa)",
          width: 60,
          height: 20,
          borderRadius: 20,
          border: "2px solid gold",
        }}
      ></div>
    ),
    value: "development",
  },
  {
    view: (
      <div
        style={{
          background: "linear-gradient(to left, #feff66, #54fa18)",
          width: 60,
          height: 20,
          borderRadius: 20,
          border: "2px solid gold",
        }}
      ></div>
    ),
    value: "done",
  },
];

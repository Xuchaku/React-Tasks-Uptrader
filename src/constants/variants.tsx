export const commentVariants = {
  hidden: (isTop: boolean) => {
    return { opacity: isTop ? 1 : 0, height: isTop ? "auto" : 0 };
  },
  visible: {
    opacity: 1,
    height: "auto",
  },
  exit: {
    opacity: 0,
    height: 0,
  },
};

export const fileBoxVariants = {
  hidden: {
    scale: 0.2,
  },
  visible: {
    scale: 1,
  },
};

export const errorVariants = {
  hidden: {
    scale: 0.2,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { delay: 1 },
  },
};

export const collapseVariants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: "auto",
  },
  exit: {
    opacity: 0,
    height: 0,
  },
};

export const projectsVariants = {
  visible: (i: number) => {
    return {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1 + i * 0.05,
      },
    };
  },
  hidden: {
    scale: 0.3,
    opacity: 0,
  },
};
export const containerProjectsVariants = {
  hidden: {
    background: "#e7ebf",
    width: 0,
    height: 0,
    minHeight: 0,
  },
  visible: {
    background: "#663399",
    width: "100%",
    height: "auto",
    minHeight: "100vh",
    transition: { duration: 1 },
  },
  exit: {
    background: "#ffffff",
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

export const containerErrorPageVariants = {
  hidden: {
    background: "#e7ebf",
    width: 0,
    height: 0,
    minHeight: 0,
  },
  visible: {
    background: "#663399",
    width: "100%",
    height: "auto",
    minHeight: "100vh",
    transition: { duration: 1 },
  },
  exit: {
    background: "#ffffff",
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

export const containerTasksVariants = {
  hidden: {
    background: "#e7ebf",
    width: 0,
    height: 0,
  },
  visible: {
    background: "#663399",
    width: "100%",
    height: "auto",
    minHeight: "100vh",
    transition: { duration: 1 },
  },
  exit: {
    background: "#ffffff",
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

export const divVariants = {
  visible: (delay: number = 0) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 1 + delay,
    },
  }),
  hidden: {
    scale: 0.3,
    opacity: 0,
  },
};

export const popupVariants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: "auto",
  },
  exit: {
    opacity: 0,
  },
};

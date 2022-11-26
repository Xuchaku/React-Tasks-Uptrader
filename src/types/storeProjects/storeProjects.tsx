import store from "../../store";

type storeProjects = ReturnType<typeof store.getState>;
export default storeProjects;

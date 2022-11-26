import IProject from "../../types/IProject/IPpoject";
import { v4 as uuidv4 } from "uuid";

type ProjectsStore = {
  projects: IProject[];
};

const initialState: ProjectsStore = {
  projects: [
    {
      name: "Project 1",
      id: uuidv4(),
      tasks: {
        queue: [
          {
            id: uuidv4(),
            indexNumber: 0,
            title: "Some title",
            description: "Some description",
            createAt: new Date(),
            timeWork: 173888,
            endDate: new Date(),
            priority: "high",
            files: ["asjdf.jpg"],
            status: "done",
            subtasks: [],
            comments: [],
          },
        ],
        development: [],
        done: [],
      },
    },
  ],
};

function projectsReducer(state: ProjectsStore = initialState, action: any) {
  return state;
}

export default projectsReducer;

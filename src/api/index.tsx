import {
  collection,
  doc,
  DocumentData,
  Firestore,
  getDocs,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import IProject from "./../types/IProject/IPpoject";
import store from "../store";

class API {
  constructor() {}
  async updateProject(dataBase: Firestore, idProject: string) {
    const storeProjects = store.getState();
    const project = storeProjects.projects.find(
      (project) => project.id == idProject
    );
    return setDoc(doc(dataBase, "projects", idProject), project);
  }
  fetchProjects(dataBase: Firestore): Promise<QuerySnapshot<DocumentData>> {
    return getDocs(collection(dataBase, "projects"));
  }
  initProject(dataBase: Firestore, project: IProject) {
    console.log(project);
    return setDoc(doc(dataBase, "projects", project.id), project);
  }
}

export const api = new API();

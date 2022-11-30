import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDocs,
  QuerySnapshot,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
//   import ITodo from "../types/ITodo/ITodo";
import ITask from "./../types/ITask/ITask";
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

  // async deleteTodoById(dataBase: Firestore, id: number) {
  //   try {
  //     await deleteDoc(doc(dataBase, "todos", `${id}`));
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // }
  // async putTodo(dataBase: Firestore, todo: ITodo) {
  //   return this.addTodo(dataBase, todo);
  // }
  // async updateTodoById(
  //   dataBase: Firestore,
  //   id: number,
  //   updatedField: { [key: string]: any }
  // ) {
  //   const washingtonRef = doc(dataBase, "todos", `${id}`);
  //   try {
  //     await updateDoc(washingtonRef, {
  //       ...updatedField,
  //     });
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // }
}

export const api = new API();

import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { api } from "./api";
import "./App.css";
import { DataBaseContext } from "./context";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

import Projects from "./pages/Projects/Projects";
import Tasks from "./pages/Tasks/Tasks";
import { firebaseConfig } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import storeProjects from "./types/storeProjects/storeProjects";
import IProject from "./types/IProject/IPpoject";
import { fetchInitProjectBack, fetchProjects } from "./store/reducer";

function App() {
  const location = useLocation();
  const [firebaseApp, setFirebaseApp] = useState(initializeApp(firebaseConfig));
  const dispatch = useDispatch();
  const [dataBase, setDataBase] = useState<Firestore>(
    getFirestore(firebaseApp)
  );

  const projects = useSelector<storeProjects, IProject[]>(
    (state) => state.projects
  );

  useEffect(() => {
    if (dataBase) {
      // dispatch(fetchInitProjectBack(dataBase, projects[0]));
      dispatch(fetchProjects(dataBase));
    }
  }, [dataBase]);
  return (
    <DataBaseContext.Provider value={dataBase}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Projects></Projects>}></Route>
          <Route path="/tasks/:id" element={<Tasks></Tasks>}></Route>
          <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        </Routes>
      </AnimatePresence>
    </DataBaseContext.Provider>
  );
}

export default App;

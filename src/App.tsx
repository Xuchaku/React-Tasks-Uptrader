import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

import "./App.css";
import { DataBaseContext } from "./context";
import Projects from "./pages/Projects/Projects";
import Tasks from "./pages/Tasks/Tasks";
import { firebaseConfig } from "./utils";
import { fetchProjects } from "./store/ActionCreators";

function App() {
  const location = useLocation();
  const [firebaseApp, setFirebaseApp] = useState(initializeApp(firebaseConfig));
  const dispatch = useDispatch();
  const [dataBase, setDataBase] = useState<Firestore>(
    getFirestore(firebaseApp)
  );

  useEffect(() => {
    if (dataBase) {
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

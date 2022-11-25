import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

import Projects from "./pages/Projects/Projects";
import Tasks from "./pages/Tasks/Tasks";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Projects></Projects>}></Route>
        <Route path="/tasks" element={<Tasks></Tasks>}></Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;

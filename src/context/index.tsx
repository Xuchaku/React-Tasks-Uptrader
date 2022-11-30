import { Firestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createContext } from "react";
import { firebaseConfig } from "../utils";
const app = initializeApp(firebaseConfig);

export const DataBaseContext = createContext<Firestore>(getFirestore(app));

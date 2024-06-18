import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Table } from "./components/table/Table";
import { LoginForm } from "./components/login-form/login";
import { FC} from "react";
const App:FC=()=> {

 return (
  <Routes>
         <Route path="/" element={<LoginForm />}></Route>
         <Route path="/table" element={<Table/>}></Route>
  </Routes>
 )
}

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import "./sass/style.scss"
import Nav from "./components/Layout/Nav";

import Home from "./components/pages/Home";
import Detail from "./components/pages/Detail";
import Contact from "./components/pages/Contact";
import Login from "./components/pages/LoginPage";
import Admin from "./components/pages/Admin";


function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
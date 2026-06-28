import React from "react";
import { Link, Routes } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <div className="h-screen w-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;

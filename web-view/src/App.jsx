import "./App.css";
import React from "react";
import { Main } from "./components/Main";
import { Index } from "./pages/Index";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Index />} />
          <Route path="index" element={<Index />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Index />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

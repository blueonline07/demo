import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  function Logout(){
    localStorage.clear()
    return <Navigate to="/login"/>
  }
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<ProtectedRoute>
          <Home></Home>
        </ProtectedRoute>} />
        <Route path="/register" element={<Register></Register>}/>
        <Route path="/login" element={<Login></Login>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

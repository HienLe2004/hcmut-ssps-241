import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import { LoginPage } from "./pages/loginPage";
import { HomePage } from "./pages/HomePage";
import { StudentHeader } from "./pages/Student/StudentHeader";


function App() {
  return (
    // <Router>
    //   {/* Header */}
    //   {/* {window.location.pathname !== '/login' && <Header />} */}

    //   {/* Nội dung chính */}
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <Route path="/login" element={<LoginPage />} />
    //   </Routes>
    //   {/* </main> */}
    // </Router>
    <StudentHeader/>
  );
}

export default App;

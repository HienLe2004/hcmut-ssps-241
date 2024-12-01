import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import { LoginPage } from "./pages/loginPage";
import { HomePage } from "./pages/Student/HomePage";
import { StudentHeader } from "./components/StudentHeader";
import { StudentHomePage } from "./pages/Student/StudentHomePage";
import { PrintDocument } from "./pages/Student/PrintDocument";
import { PrintingHistory } from "./pages/Student/PrintingHistory";
import { BuyPage } from "./pages/Student/BuyPage";


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<BuyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student/homepage" element={<StudentHomePage />} />
        <Route path="/student/printDoc" element={<PrintDocument />} />
        <Route path="/student/printHistory" element={<PrintingHistory />} />
        

      </Routes>

    </Router>
  );
}

export default App;

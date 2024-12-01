import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import { LoginPage } from "./pages/loginPage";
import { HomePage } from "./pages/Student/HomePage";
import { StudentHeader } from "./components/StudentHeader";
import { StudentHomePage } from "./pages/Student/StudentHomePage";
import { PrintDocument } from "./pages/Student/PrintDocument";
import { SPSOHomePage } from "./pages/SPSO/SPSOHomePage";
import { WaitingDocsPage } from "./pages/SPSO/WaitingDocsPage";
import { PrintersPage } from "./pages/SPSO/PrintersPage";
import { SystemHistoryPage } from "./pages/SPSO/SystemHistoryPage";
import { ManagementPage } from "./pages/SPSO/ManagementPage";
import { ReportsPage } from "./pages/SPSO/ReportsPage";


function App() {
  return (
    <div className="app">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student/homepage" element={<StudentHomePage />} />
      <Route path="/student/printDoc" element={<PrintDocument />} />

      <Route path="/spso/homepage" element={<SPSOHomePage/>}/>
      <Route path="/spso/waiting-docs" element={<WaitingDocsPage/>}/>
      <Route path="/spso/printers" element={<PrintersPage/>}/>
      <Route path="/spso/history" element={<SystemHistoryPage/>}/>
      <Route path="/spso/management" element={<ManagementPage/>}/>
      <Route path="/spso/reports" element={<ReportsPage/>}/>    
    </Routes>    
    </div>
  );
}

export default App;

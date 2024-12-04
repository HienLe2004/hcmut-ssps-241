import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage } from "./pages/loginPage";
import { HomePage } from "./pages/Student/HomePage";
import { StudentHomePage } from "./pages/Student/StudentHomePage";
import { PrintDocument } from "./pages/Student/PrintDocument";
import { SPSOHomePage } from "./pages/SPSO/SPSOHomePage";
import { WaitingDocsPage } from "./pages/SPSO/WaitingDocsPage/WaitingDocsPage";
import { PrintersPage } from "./pages/SPSO/PrintersPage/PrintersPage";
import { SystemHistoryPage } from "./pages/SPSO/SystemHistoryPage/SystemHistoryPage";
import { ManagementPage } from "./pages/SPSO/ManagementPage/ManagementPage";
import { ReportsPage } from "./pages/SPSO/ReportsPage/ReportsPage";
import { PrintingHistory } from "./pages/Student/PrintingHistory";
import { BuyPage } from "./pages/Student/BuyPage";
import { PrinterInfoPage } from "./pages/SPSO/PrintersPage/PrinterInfoPage";

import { createServer } from "miragejs";
createServer({
  routes() {
    //Lấy danh sách sinh viên trong hệ thống
    this.get("/api/students", () => [
      { id: 2211020},
      { id: 2210202},
      { id: 2210203},
      { id: 2210231},
      { id: 2212020}
    ])
    //Lấy danh sách máy in trong hệ thống
    this.get("/api/printers", () => [
      { id: "H1-101-1"},
      { id: "H1-102-1"},
      { id: "H2-201-1"},
      { id: "H2-202-2"}
    ])
    //Lấy danh sách yêu cầu đang chờ in trong hệ thống
    this.get("/api/waiting-docs", () => [
      { 
        id: 1,
        student_id: 2211020,
        printer_id: "H1-101-1",
        size: "A5",
        copy: 10,
        file: "oiw.docx",
        start: "10:10 10/20/20",
      },
      { 
        id: 2,
        student_id: 2210202,
        printer_id: "H1-101-1",
        size: "A5",
        copy: 10,
        file: "ower.docx",
        start: "10:12 10/20/20",
      },
      { 
        id: 3,
        student_id: 2210231,
        printer_id: "H1-101-1",
        size: "A5",
        copy: 10,
        file: "er.docx",
        start: "10:13 10/20/20",
      },
    ])
  }
})

function App() {
  return (
    <div className="app">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student/homepage" element={<StudentHomePage />} />
      <Route path="/student/printDoc" element={<PrintDocument />} />
      <Route path="/student/printHistory" element={<PrintingHistory />} />
      <Route path="/student/buyPage" element={<BuyPage />} />

      <Route path="/spso/homepage" element={<SPSOHomePage/>}/>
      <Route path="/spso/waiting-docs" element={<WaitingDocsPage/>}/>
      <Route path="/spso/printers" element={<PrintersPage/>}/>
      <Route path="/spso/printers/:id" element={<PrinterInfoPage/>}/>
      <Route path="/spso/history" element={<SystemHistoryPage/>}/>
      <Route path="/spso/management" element={<ManagementPage/>}/>
      <Route path="/spso/reports" element={<ReportsPage/>}/>    
    </Routes>    
    </div>
  );
}

export default App;
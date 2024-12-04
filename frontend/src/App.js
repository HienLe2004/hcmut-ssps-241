import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { format, parse } from "date-fns";
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
import { students, rooms, waitingDocs, printers} from "./utils/mock-data";
import { createServer } from "miragejs";
createServer({
  routes() {
    //Lấy danh sách sinh viên trong hệ thống
    this.get("/api/students", () => students)
    //Lấy danh sách máy in trong hệ thống
    this.get("/api/printers", () => printers)
    //Thêm máy in mới
    this.post("/api/printers", (schema, request) => {
      let attrs = JSON.parse(request.requestBody)
      const printerAtRoom = printers.filter(printer => printer.room == attrs.room)
      attrs.id = attrs.room + "-" + (printerAtRoom.length + 1)
      attrs.start = (format(new Date(),'kk:mm dd/MM/Y'))
      attrs.status = "on"
      printers.push(attrs)
      console.log(printers)
      return {printer: attrs}
    })
    //Lấy danh sách phòng trên hệ thống
    this.get("/api/rooms", () => rooms)
    //Lấy danh sách yêu cầu đang chờ in trong hệ thống
    this.get("/api/waiting-docs", () => waitingDocs)
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